document.addEventListener('DOMContentLoaded', () => {
    const logos = document.querySelectorAll('.logo');
    const wrapper = document.querySelector('.carousel-wrapper');
    const track = document.querySelector('.logo-track');
    
    let isPaused = false;
    const PAUSE_DURATION = 3000; 
    const TOLERANCE_ZONE = 30; 
    const SPEED = 2; // Tốc độ di chuyển (pixels/frame)

    let currentX = 0;
    
    // Hàm chính để điều khiển CHUYỂN ĐỘNG
    function moveTrack() {
        if (isPaused) return;

        // 1. Di chuyển băng chuyền
        currentX -= SPEED;
        
        // 2. Tạo vòng lặp vô tận (khi bộ logo đầu tiên đi hết, reset lại vị trí)
        // Chiều rộng của 1 bộ logo (7 logo)
        const logoWidth = logos[0].offsetWidth + (parseFloat(getComputedStyle(logos[0]).marginLeft) * 2); 
        const setWidth = logoWidth * 7; 
        
        if (Math.abs(currentX) >= setWidth) {
            currentX = 0; // Reset về 0
        }
        
        // Áp dụng vị trí mới
        track.style.transform = `translateX(${currentX}px)`;

        // 3. Kiểm tra Spotlight và tiếp tục vòng lặp
        checkCenterLogo();
        requestAnimationFrame(moveTrack);
    }

    // Hàm dừng có chỉnh sửa để tạo hiệu ứng mượt mà
    function pauseAndSpotlight(targetLogo) {
        if (isPaused) return;

        isPaused = true;

        // 1. Tạm dừng chuyển động (JS không gọi requestAnimationFrame)
        // 2. Thêm class 'slowing-down' để áp dụng transition chậm hơn (CSS)
        track.classList.add('slowing-down'); 

        // 3. Áp dụng hiệu ứng Spotlight (sau 0.5s để đồng bộ với transition CSS)
        setTimeout(() => {
            logos.forEach(logo => logo.classList.remove('is-active'));
            targetLogo.classList.add('is-active');
        }, 500); // 0.5s để logo trượt chậm lại rồi mới sáng lên

        // 4. Hẹn giờ chạy lại
        setTimeout(() => {
            // Loại bỏ hiệu ứng
            targetLogo.classList.remove('is-active');
            
            // Xóa class 'slowing-down' để trở về tốc độ cũ (CSS)
            track.classList.remove('slowing-down'); 
            isPaused = false;
            
            // Bắt đầu lại vòng lặp chuyển động
            requestAnimationFrame(moveTrack); 
        }, PAUSE_DURATION + 500); // Tổng thời gian dừng = 3s + 0.5s chuyển tiếp
    }


    function checkCenterLogo() {
        if (isPaused) return;

        const wrapperRect = wrapper.getBoundingClientRect();
        const center = wrapperRect.left + wrapperRect.width / 2;

        logos.forEach(logo => {
            const logoRect = logo.getBoundingClientRect();
            const logoCenter = logoRect.left + logoRect.width / 2;
            const distance = Math.abs(center - logoCenter);

            if (distance < TOLERANCE_ZONE) {
                // Nếu tìm thấy logo cần Spotlight, dừng và kích hoạt hiệu ứng
                pauseAndSpotlight(logo);
            }
        });
    }

    // Bắt đầu chuyển động (thay thế cho animation CSS)
    moveTrack();
});