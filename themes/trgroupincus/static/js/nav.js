// Hero Carousel (if present on page)
(function () {
  var carousel = document.getElementById('hero-carousel');
  if (!carousel) return;

  var slides = carousel.querySelectorAll('.carousel-slide');
  var dots = carousel.querySelectorAll('.carousel-dot');
  var prev = document.getElementById('carousel-prev');
  var next = document.getElementById('carousel-next');
  var current = 0;
  var total = slides.length;
  var autoplayInterval;

  function goTo(index) {
    slides[current].classList.remove('active');
    if (dots[current]) dots[current].classList.remove('active');
    current = (index + total) % total;
    slides[current].classList.add('active');
    if (dots[current]) dots[current].classList.add('active');
  }

  function startAutoplay() {
    autoplayInterval = setInterval(function () { goTo(current + 1); }, 5500);
  }

  function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
  }

  if (prev) prev.addEventListener('click', function () { goTo(current - 1); resetAutoplay(); });
  if (next) next.addEventListener('click', function () { goTo(current + 1); resetAutoplay(); });

  dots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      goTo(parseInt(dot.dataset.index));
      resetAutoplay();
    });
  });

  carousel.addEventListener('mouseenter', function () { clearInterval(autoplayInterval); });
  carousel.addEventListener('mouseleave', startAutoplay);

  startAutoplay();
})();

// Product image gallery — click thumbnail to swap main image
(function () {
  var mainImage = document.querySelector('.product-main-image');
  var thumbs = document.querySelectorAll('.product-thumb');

  if (!mainImage || !thumbs.length) return;

  thumbs[0].classList.add('active');

  thumbs.forEach(function (thumb) {
    thumb.addEventListener('click', function () {
      mainImage.src = thumb.src;
      thumbs.forEach(function (t) { t.classList.remove('active'); });
      thumb.classList.add('active');
    });
  });
})();

// Mobile navigation toggle
(function () {
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('site-nav');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', function () {
    var isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });

  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', function (e) {
    if (!nav.contains(e.target) && !toggle.contains(e.target)) {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
})();
