<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\OrderDetail;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class OrderDetailController extends Controller
{
    public function index()
    {
        return response()->json(['error' => 'Api does not exist!'], Response::HTTP_NOT_FOUND);
    }

    public function store(Request $request)
    {
        return response()->json(['error' => 'Api does not exist!'], Response::HTTP_NOT_FOUND);
    }

    public function show($order_id)
    {
        try {
            $order_details = OrderDetail::with(['product'])
                ->where('order_id', $order_id)
                ->get();

            return response()->json($order_details, Response::HTTP_CREATED);
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_NOT_FOUND);
        } catch (Exception $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function update(Request $request, string $id)
    {
        return response()->json(['error' => 'Api does not exist!'], Response::HTTP_NOT_FOUND);
    }

    public function destroy(string $id)
    {
        DB::beginTransaction();
        try {
            $orderDetail = OrderDetail::findOrFail($id);
            $order = $orderDetail->order;
            $orderId = $order->id;

            $orderDetail->delete();

            $newTotalAmount = OrderDetail::where('order_id', $orderId)
                ->join('products', 'order_details.product_id', '=', 'products.id')
                ->sum(DB::raw('order_details.quantity * products.price'));

            $order->total_amount = $newTotalAmount;
            $order->save();

            DB::commit();

            return response()->json(['success' => true], Response::HTTP_NO_CONTENT);
        } catch (ModelNotFoundException $e) {
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_NOT_FOUND);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json(['errors' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
