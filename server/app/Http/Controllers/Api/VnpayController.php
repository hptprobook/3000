<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class VnpayController extends Controller
{
    /* <select name="bankcode" id="bankcode" class="form-control">
            <option value="">Không chọn </option>
			<option value="MBAPP">Ung dung MobileBanking</option>
            <option value="VNPAYQR">VNPAYQR</option>
            <option value="VNBANK">LOCAL BANK</option>
            <option value="IB">INTERNET BANKING</option>
            <option value="ATM">ATM CARD</option>
            <option value="INTCARD">INTERNATIONAL CARD</option>
            <option value="VISA">VISA</option>
            <option value="MASTERCARD"> MASTERCARD</option>
            <option value="JCB">JCB</option>
            <option value="UPI">UPI</option>
            <option value="VIB">VIB</option>
             <option value="VIETCAPITALBANK">VIETCAPITALBANK</option>
            <option value="SCB">Ngan hang SCB</option>
            <option value="NCB">Ngan hang NCB</option>
            <option value="SACOMBANK">Ngan hang SacomBank  </option>
            <option value="EXIMBANK">Ngan hang EximBank </option>
            <option value="MSBANK">Ngan hang MSBANK </option>
            <option value="NAMABANK">Ngan hang NamABank </option>
            <option value="VNMART"> Vi dien tu VnMart</option>
            <option value="VIETINBANK">Ngan hang Vietinbank  </option>
            <option value="VIETCOMBANK">Ngan hang VCB </option>
            <option value="HDBANK">Ngan hang HDBank</option>
            <option value="DONGABANK">Ngan hang Dong A</option>
            <option value="TPBANK">Ngân hàng TPBank </option>
            <option value="OJB">Ngân hàng OceanBank</option>
            <option value="BIDV">Ngân hàng BIDV </option>
            <option value="TECHCOMBANK">Ngân hàng Techcombank </option>
            <option value="VPBANK">Ngan hang VPBank </option>
            <option value="AGRIBANK">Ngan hang Agribank </option>
            <option value="MBBANK">Ngan hang MBBank </option>
            <option value="ACB">Ngan hang ACB </option>
            <option value="OCB">Ngan hang OCB </option>
            <option value="IVB">Ngan hang IVB </option>
            <option value="SHB">Ngan hang SHB </option>
			<option value="APPLEPAY">Apple Pay </option>
        </select> */
    public function create(Request $request)
    {

        $vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
        $vnp_Returnurl = "http://127.0.0.1/api/checkout";
        $vnp_TmnCode = "3E5OFS6N"; //Mã website tại VNPAY
        $vnp_HashSecret = "OZSZCHTPJSZVEWFRAUZETVLDUIXTWJWN"; //Chuỗi bí mật

        $vnp_TxnRef = "1250";
        $vnp_OrderInfo = "Thanh toán đơn hàng";
        $vnp_OrderType = "billpayment";
        $vnp_Amount = $request->amount * 100;
        $vnp_Locale = "vn";
        $vnp_BankCode = $request->bankcode;
        $vnp_IpAddr = $_SERVER['REMOTE_ADDR'];
        //Add Params of 2.0.1 Version
        // $vnp_ExpireDate = $_POST['txtexpire'];
        //Billing
        $inputData = array(
            "vnp_Version" => "2.1.0",
            "vnp_TmnCode" => $vnp_TmnCode,
            "vnp_Amount" => $vnp_Amount,
            "vnp_Command" => "pay",
            "vnp_CreateDate" => date('YmdHis'),
            "vnp_CurrCode" => "VND",
            "vnp_IpAddr" => $vnp_IpAddr,
            "vnp_Locale" => $vnp_Locale,
            "vnp_OrderInfo" => $vnp_OrderInfo,
            "vnp_OrderType" => $vnp_OrderType,
            "vnp_ReturnUrl" => $vnp_Returnurl,
            "vnp_TxnRef" => $vnp_TxnRef
        );

        if (isset($vnp_BankCode) && $vnp_BankCode != "") {
            $inputData['vnp_BankCode'] = $vnp_BankCode;
        }

        //var_dump($inputData);
        ksort($inputData);
        $query = "";
        $i = 0;
        $hashdata = "";
        foreach ($inputData as $key => $value) {
            if ($i == 1) {
                $hashdata .= '&' . urlencode($key) . "=" . urlencode($value);
            } else {
                $hashdata .= urlencode($key) . "=" . urlencode($value);
                $i = 1;
            }
            $query .= urlencode($key) . "=" . urlencode($value) . '&';
        }

        $vnp_Url = $vnp_Url . "?" . $query;
        if (isset($vnp_HashSecret)) {
            $vnpSecureHash =   hash_hmac('sha512', $hashdata, $vnp_HashSecret); //
            $vnp_Url .= 'vnp_SecureHash=' . $vnpSecureHash;
        }
        $returnData = array(
            'code' => '00', 'message' => 'success', 'data' => $vnp_Url
        );
        if (isset($_POST['redirect'])) {
            header('Location: ' . $vnp_Url);
            die();
        } else {
            echo json_encode($returnData);
        }
        // vui lòng tham khảo thêm tại code demo
    }

    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
