Để thiết lập đăng nhập sử dụng Laravel Sanctum và React với Axios, bạn cần thực hiện các bước sau đây:

-   Bước 1: Cài đặt Laravel Sanctum

    -   Trong terminal của bạn, chạy lệnh sau trong thư mục gốc của dự án Laravel:

        composer require laravel/sanctum

    -   Sau khi cài đặt, bạn cần xuất bản cấu hình Sanctum và chạy migration:

        php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
        php artisan migrate

-   Bước 2: Cấu hình CORS

    -   Chỉnh sửa file config/cors.php để cho phép các yêu cầu từ domain của ứng dụng React:

        'paths' => ['api/*', 'sanctum/csrf-cookie'],
        'allowed_methods' => ['*'],
        'allowed_origins' => ['http://localhost:3000'], // Địa chỉ của SPA React
        'allowed_origins_patterns' => [],
        'allowed_headers' => ['*'],
        'exposed_headers' => [],
        'max_age' => 0,
        'supports_credentials' => true, // Quan trọng để gửi cookie qua CORS

-   Bước 3: Cấu hình Middleware

    -   Thêm EnsureFrontendRequestsAreStateful vào $middlewareGroups trong app/Http/Kernel.php:

        use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;

        'api' => [
        EnsureFrontendRequestsAreStateful::class,
        'throttle:api',
        \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ],

-   Bước 4: Tạo Route Xác Thực

    -   Trong routes/api.php, bạn cần một route để xử lý yêu cầu đăng nhập:

        use App\Http\Controllers\AuthController;

        Route::post('/login', [AuthController::class, 'login']);

-   Bước 5: Tạo Auth Controller

    -   Tạo AuthController với phương thức login:

        namespace App\Http\Controllers;

        use Illuminate\Support\Facades\Auth;
        use Illuminate\Http\Request;

        class AuthController extends Controller
        {
        public function login(Request $request)
        {
        $credentials = $request->validate([
        'email' => 'required|email',
        'password' => 'required',
        ]);

                  if (Auth::attempt($credentials)) {
                      $request->session()->regenerate();
                      return response()->json(Auth::user(), 200);
                  }

                  return response()->json(['message' => 'The provided credentials do not match our records.'], 401);
              }

        }

-   Bước 6: Frontend với React và Axios

    -   Trong ứng dụng React của bạn, cài đặt Axios:

        npm install axios

    -   Tạo hàm đăng nhập sử dụng Axios:

        import axios from 'axios';

        const api = axios.create({
        baseURL: 'http://your-laravel-app.test/api',
        withCredentials: true // Cho phép gửi cookie qua CORS
        });

        export const login = async (email, password) => {
        try {
        // Lấy CSRF token trước khi đăng nhập
        await api.get('/sanctum/csrf-cookie');

              // Thực hiện yêu cầu đăng nhập
              const response = await api.post('/login', { email, password });

              // Lưu trữ thông tin người dùng hoặc token nhận được (nếu cần)
              console.log(response.data);

        } catch (error) {
        console.error('Error during login', error.response);
        }
        };

    -   Gọi hàm login từ component hoặc hook khi người dùng gửi form đăng nhập.

-   Bước 7: Lưu Token và Xử lý Session

    -   Laravel Sanctum sử dụng session để xác thực người dùng, vì vậy token không cần phải được lưu trữ trên client. Nó sẽ được lưu trữ trong cookie của session, mà Laravel sẽ tự quản lý.

-   Bước 8: Bảo mật

    -   Luôn sử dụng HTTPS khi triển khai ứng dụng của bạn trên môi trường sản xuất để đảm bảo an toàn thông tin người dùng.

    -   Những bước trên đây là hướng dẫn chi tiết kèm theo code mẫu để thiết lập hệ thống đăng nhập sử dụng Laravel Sanctum và React với Axios. Hãy chắc chắn rằng bạn đã thực hiện các bước cần thiết để bảo mật ứng dụng của mình và kiểm tra kỹ lưỡng trong quá trình phát triển.
