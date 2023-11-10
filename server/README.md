1. Xác Thực Token Trên Mỗi Yêu Cầu
   Mỗi khi gửi yêu cầu đến server, bạn nên gửi token này trong header Authorization. Trên server, bạn cần xác thực token này cho mỗi yêu cầu API.

php
Copy code
// Trong Laravel, bạn có thể sử dụng middleware để xác thực token
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
return $request->user();
});
Khi token không hợp lệ hoặc đã hết hạn, Laravel sẽ trả về lỗi, và bạn có thể xử lý lỗi này trên client-side để chuyển hướng người dùng ra khỏi các trang cần xác thực.

2. Hạn Chế Thời Gian Sống của Token
   Cung cấp token với một thời gian sống giới hạn (thường là vài giờ) có thể giảm thiểu rủi ro nếu token bị lộ. Laravel Sanctum cho phép bạn cấu hình thời gian sống của token.

php
Copy code
// Trong method createToken khi bạn tạo token
$token = $user->createToken('access_token')->plainTextToken;
Bạn có thể cấu hình thời gian sống token trong file cấu hình sanctum.php.

3. Sử Dụng HTTPS
   Đảm bảo rằng mọi giao tiếp giữa client và server đều được mã hóa qua HTTPS. Điều này ngăn chặn việc nghe trộm và bắt token trong quá trình truyền.

4. Kiểm Tra Token Trong Local Storage
   Trước khi gửi yêu cầu, bạn có thể kiểm tra token trong local storage:

javascript
Copy code
if (!localStorage.getItem('token')) {
// Chuyển hướng người dùng đến trang đăng nhập
} 5. Xử Lý Token Hết Hạn hoặc Không Hợp Lệ
Khi server phát hiện token không hợp lệ hoặc đã hết hạn, nó sẽ trả về một lỗi (ví dụ: 401 Unauthorized). Trên client-side, bạn nên xử lý lỗi này và chuyển hướng người dùng đến trang đăng nhập.

javascript
Copy code
axios.interceptors.response.use(response => response, error => {
if (error.response.status === 401) {
// Xử lý token hết hạn hoặc không hợp lệ
}
}); 6. Cân Nhắc Sử Dụng Refresh Token
Để tăng cường bảo mật, bạn có thể cân nhắc sử dụng cơ chế refresh token, nơi mà access token có thời gian sống ngắn và có thể được làm mới bằng refresh token.

Kết Luận
Bằng cách xác thực token trên server và thực hiện các biện pháp bảo mật khác, bạn có thể đảm bảo rằng ngay cả khi token bị thay đổi hoặc lộ lọt từ local storage, thông tin người dùng và hệ thống của bạn vẫn được bảo vệ.
