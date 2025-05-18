(function($) {
    "use strict";

    // settings append in body
    function tp_settings_append($x) {
        var settings = $('body');
        let dark;
        $x == true ? dark = 'd-block' : dark = 'd-none';
        var settings_html = `<div class="tp-theme-settings-area transition-3">
		<div class="tp-theme-wrapper">
		   <div class="tp-theme-header text-center">
			  <h4 class="tp-theme-header-title">Harry Theme Settings</h4>
		   </div>

		   <!-- THEME TOGGLER -->
		   <div class="tp-theme-toggle mb-20 ${dark}">
			  <label class="tp-theme-toggle-main" for="tp-theme-toggler">
				 <span class="tp-theme-toggle-dark active"><i class="fa-light fa-moon"></i> Dark</span>
					<input type="checkbox" id="tp-theme-toggler">
					<i class="tp-theme-toggle-slide"></i>
				 <span class="tp-theme-toggle-light"><i class="fa-light fa-sun-bright"></i> Light</span>
			  </label>
		   </div>

		   <!--  RTL SETTINGS -->
		   <div class="tp-theme-dir mb-20">
			  <label class="tp-theme-dir-main" for="tp-dir-toggler">
				 <span class="tp-theme-dir-rtl"> RTL</span>
					<input type="checkbox" id="tp-dir-toggler">
					<i class="tp-theme-dir-slide"></i>
				 <span class="tp-theme-dir-ltr active"> LTR</span>
			  </label>
		   </div>

		   <!-- COLOR SETTINGS -->
		   <div class="tp-theme-settings">
			  <div class="tp-theme-settings-wrapper">
				 <div class="tp-theme-settings-open">
					<button class="tp-theme-settings-open-btn">
					   <span class="tp-theme-settings-gear">
						  <i class="fa-light fa-gear"></i>
					   </span>
					   <span class="tp-theme-settings-close">
						  <i class="fa-regular fa-xmark"></i>
					   </span>
					</button>
				 </div>
				 <div class="row row-cols-4 gy-2 gx-2">
					<div class="col">
					   <div class="tp-theme-color-item tp-color-active">
						  <button class="tp-theme-color-btn tp-color-settings-btn d-none" data-color-default="#F50963" type="button" data-color="#F50963"></button>
						  <button class="tp-theme-color-btn tp-color-settings-btn" type="button" data-color="#F50963"></button>
					   </div>
					</div>
					<div class="col">
					   <div class="tp-theme-color-item tp-color-active">
						  <button class="tp-theme-color-btn tp-color-settings-btn" type="button" data-color="#008080"></button>
					   </div>
					</div>
					<div class="col">
					   <div class="tp-theme-color-item tp-color-active">
						  <button class="tp-theme-color-btn tp-color-settings-btn" type="button" data-color="#AB6C56"></button>
					   </div>
					</div>
					<div class="col">
					   <div class="tp-theme-color-item tp-color-active">
						  <button class="tp-theme-color-btn tp-color-settings-btn" type="button" data-color="#3661FC"></button>
					   </div>
					</div>
					<div class="col">
					   <div class="tp-theme-color-item tp-color-active">
						  <button class="tp-theme-color-btn tp-color-settings-btn" type="button" data-color="#2CAE76"></button>
					   </div>
					</div>
					<div class="col">
					   <div class="tp-theme-color-item tp-color-active">
						  <button class="tp-theme-color-btn tp-color-settings-btn" type="button" data-color="#FF5A1B"></button>
					   </div>
					</div>
					<div class="col">
                        <div class="tp-theme-color-item tp-color-active">
                           <button class="tp-theme-color-btn tp-color-settings-btn" type="button" data-color="#03041C"></button>
                        </div>
                     </div>
					<div class="col">
					   <div class="tp-theme-color-item tp-color-active">
						  <button class="tp-theme-color-btn tp-color-settings-btn" type="button" data-color="#ED212C"></button>
					   </div>
					</div>
				 </div>
			  </div>
			  <div class="tp-theme-color-input">
				 <h6>Choose Custom Color</h6>
				 <input type="color" id="tp-color-setings-input" value="#F50963">
				 <label id="tp-theme-color-label" for="tp-color-setings-input"></label>
			  </div>
		   </div>
		</div>
	 </div>`;
        settings.append(settings_html);
    }
    // tp_settings_append(true); // if want to enable dark light mode then send "true";

    // settings open btn
    $(".tp-theme-settings-open-btn").on("click", function() {
        $(".tp-theme-settings-area").toggleClass("settings-opened");
    });

    // rtl settings
    function tp_rtl_settings() {

        $('#tp-dir-toggler').on("change", function() {
            toggle_rtl();

        });


        // set toggle theme scheme
        function tp_set_scheme(tp_dir) {
            localStorage.setItem('tp_dir', tp_dir);
            document.documentElement.setAttribute("dir", tp_dir);

            if (tp_dir === 'rtl') {
                var list = $("[href='assets/css/bootstrap.css']");
                $(list).attr("href", "assets/css/bootstrap-rtl.css");
            } else {
                var list = $("[href='assets/css/bootstrap.css']");
                $(list).attr("href", "assets/css/bootstrap.css");
            }
        }

        // toogle theme scheme
        function toggle_rtl() {
            if (localStorage.getItem('tp_dir') === 'rtl') {
                tp_set_scheme('ltr');
                var list = $("[href='assets/css/bootstrap-rtl.css']");
                $(list).attr("href", "assets/css/bootstrap.css");
            } else {
                tp_set_scheme('rtl');
                var list = $("[href='assets/css/bootstrap.css']");
                $(list).attr("href", "assets/css/bootstrap-rtl.css");
            }
        }

        // set the first theme scheme
        function tp_init_dir() {
            if (localStorage.getItem('tp_dir') === 'rtl') {
                tp_set_scheme('rtl');
                var list = $("[href='assets/css/bootstrap.css']");
                $(list).attr("href", "assets/css/bootstrap-rtl.css");
                document.getElementById('tp-dir-toggler').checked = true;
            } else {
                tp_set_scheme('ltr');
                document.getElementById('tp-dir-toggler').checked = false;
                var list = $("[href='assets/css/bootstrap.css']");
                $(list).attr("href", "assets/css/bootstrap.css");
            }
        }
        tp_init_dir();
    }
    if ($("#tp-dir-toggler").length > 0) {
        tp_rtl_settings();
    }

    // dark light mode toggler
    function tp_theme_toggler() {

        $('.themepure-theme-toggle-input').on("change", function() {
            toggleTheme();
            console.log('hi');
        });


        // set toggle theme scheme
        function tp_set_scheme(tp_theme) {
            localStorage.setItem('tp_theme_scheme', tp_theme);
            document.documentElement.setAttribute("tp-theme", tp_theme);
        }

        // toogle theme scheme
        function toggleTheme() {
            if (localStorage.getItem('tp_theme_scheme') === 'tp-theme-dark') {
                tp_set_scheme('tp-theme-light');
                $('.themepure-theme-toggle').removeClass('dark-active').addClass('light-active');
            } else {
                tp_set_scheme('tp-theme-dark');
                $('.themepure-theme-toggle').removeClass('light-active').addClass('dark-active');
            }
        }

        // set the first theme scheme
        function tp_init_theme() {

            if (localStorage.getItem('tp_theme_scheme') === 'tp-theme-light') {

                tp_set_scheme('tp-theme-light');
                $('.themepure-theme-toggle').removeClass('dark-active').addClass('light-active');
                document.getElementsByClassName('tp-theme-toggler').checked = false;

            } else {
                tp_set_scheme('tp-theme-dark');
                document.getElementsByClassName('tp-theme-toggler').checked = true;
                $('.themepure-theme-toggle').removeClass('light-active').addClass('dark-active');
            }
        }
        tp_init_theme();
    }
    if ($(".themepure-theme-toggle-input").length > 0) {
        tp_theme_toggler();
    }


    // color settings
    function tp_color_settings() {

        // set color scheme
        function tp_set_color(tp_color_scheme) {
            localStorage.setItem('tp_color_scheme', tp_color_scheme);
            document.querySelector(':root').style.setProperty('--tp-theme-1', tp_color_scheme);
            document.getElementById("tp-color-setings-input").value = tp_color_scheme;
            document.getElementById("tp-theme-color-label").style.backgroundColor = tp_color_scheme;
        }

        // set color
        function tp_set_input() {
            var color = localStorage.getItem('tp_color_scheme');
            document.getElementById("tp-color-setings-input").value = color;
            document.getElementById("tp-theme-color-label").style.backgroundColor = color;


        }
        tp_set_input();

        function tp_init_color() {
            var defaultColor = $(".tp-color-settings-btn").attr('data-color-default');
            var setColor = localStorage.getItem('tp_color_scheme');

            if (setColor != null) {

            } else {
                setColor = defaultColor;
            }

            if (defaultColor !== setColor) {
                document.querySelector(':root').style.setProperty('--tp-theme-1', setColor);
                document.getElementById("tp-color-setings-input").value = setColor;
                document.getElementById("tp-theme-color-label").style.backgroundColor = setColor;
                tp_set_color(setColor);
            } else {
                document.querySelector(':root').style.setProperty('--tp-theme-1', defaultColor);
                document.getElementById("tp-color-setings-input").value = defaultColor;
                document.getElementById("tp-theme-color-label").style.backgroundColor = defaultColor;
                tp_set_color(defaultColor);
            }
        }
        tp_init_color();


        let themeButtons = document.querySelectorAll('.tp-color-settings-btn');

        themeButtons.forEach(color => {
            color.addEventListener('click', () => {
                let datacolor = color.getAttribute('data-color');
                document.querySelector(':root').style.setProperty('--tp-theme-1', datacolor);
                document.getElementById("tp-theme-color-label").style.backgroundColor = datacolor;
                tp_set_color(datacolor);
            });
        });



        const colorInput = document.querySelector('#tp-color-setings-input');
        const colorVariable = '--tp-theme-1';


        colorInput.addEventListener('change', function(e) {
            var clr = e.target.value;
            document.documentElement.style.setProperty(colorVariable, clr);
            tp_set_color(clr);
            tp_set_check(clr);
        });


        function tp_set_check(clr) {
            const arr = Array.from(document.querySelectorAll('[data-color]'));

            var a = localStorage.getItem('tp_color_scheme');

            let test = arr.map(color => {
                let datacolor = color.getAttribute('data-color');

                return datacolor;
            }).filter(color => color == a);

            var arrLength = test.length;

            if (arrLength == 0) {
                $('.tp-color-active').removeClass('active');
            } else {
                $('.tp-color-active').addClass('active');
            }
        }

        function tp_check_color() {
            var a = localStorage.getItem('tp_color_scheme');

            var list = $(`[data-color="${a}"]`);

            list.parent().addClass('active').parent().siblings().find('.tp-color-active').removeClass('active')
        }
        tp_check_color();

        $('.tp-color-active').on('click', function() {
            $(this).addClass('active').parent().siblings().find('.tp-color-active').removeClass('active');
        });

    }
    if (($(".tp-color-settings-btn").length > 0) && ($("#tp-color-setings-input").length > 0) && ($("#tp-theme-color-label").length > 0)) {
        tp_color_settings();
    }

})(jQuery);