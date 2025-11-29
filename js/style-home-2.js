document.addEventListener("DOMContentLoaded", function () {
  const options = { duration: 2, separator: "," };

  //lấy đúng đối tượng countup từ window//
  const  CountUp =window.countUp.CountUp;

  const clients = new CountUp("clients", 1230, options);
  const projects = new CountUp("projects", 210, options);
  const launched = new CountUp("launched", 1200, options);
  const years = new CountUp("years", 230, options);

  // Kích hoạt khi cuộn đến phần tử
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        clients.start();
        projects.start();
        launched.start();
        years.start();
      }
    });
  });

  observer.observe(document.querySelector(".stats"));
});