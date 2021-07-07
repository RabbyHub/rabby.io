(function () {
  var btn = $(".menu-btn");
  btn.on("click", function () {
    btn.toggleClass("expand");
    $(".menu").toggleClass("show");
  });

  var downloadBtn = $(".download-btn");
  var toast = $(".toast");
  downloadBtn.on("click", function (e) {
    if (/mobile/i.test(navigator.userAgent)) {
      e.preventDefault();
      toast.text("Please visit this site from the desktop");
      toast.addClass("show");
      setTimeout(function () {
        toast.css({ opacity: 1 });
      });
      setTimeout(function () {
        toast.css({ opacity: 0 });
        function onToastHide() {
          toast.removeClass("show");
          toast.off("transitionend", onToastHide);
        }
        toast.on("transitionend", onToastHide);
      }, 2000);
    }
  });

  var isFirefox = /firefox/i.test(navigator.userAgent);
  var isBrave = /brave/i.test(navigator.userAgent);
  var isEdge = /edg\//i.test(navigator.userAgent)
  var isChrome = !isBrave && !isEdge && /chrome/i.test(navigator.userAgent)
  console.log(isChrome)
  if (isFirefox) {
    $('#firefox').addClass('highlight');
  }
  if (isBrave) {
    $('#brave-browser').addClass('highlight');
  }
  if (isEdge) {
    $('#edge').addClass('highlight')
  }
  if (isChrome) {
    $('#chrome').addClass('highlight')
  }
})();
