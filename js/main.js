$(function () {

    // Выбор языка
    $('#select').ddslick();

    /* Валидация форм */
    var formValidate = function () {

        jQuery.validator.addMethod("minlenghtphone", function (value) {
            return value.replace(/\D+/g, '').length > 10;
        });

        $('form').each(function () {
            $(this).on('submit', function () {
                $(this).validate({
                    rules: {
                        name: 'required',
                        email: 'required',
                        agree: 'required',
                        tel: {
                            required: true,
                            minlenghtphone: true
                        },
                    },
                    onkeyup: false,
                    messages: {
                        name: 'Введите ваше имя',
                        tel: 'Введите ваш телефон',
                        email: 'Введите адрес электронной почты',
                        agree: 'Согласитесь с нашими условиями'
                    },
                });
                if ($(this).valid()) {
                    var wrap = $(this)[0].closest('.popup__sending');
                    if (wrap) {
                        $(wrap).siblings('.popup__success').show();
                        $(wrap).hide();
                    }
                }
                return false;
            })
        });
    };

    /* Селект (выпадашка) */
    var customSelect = function () {
        $(document).on('click', '.select__header', function () {
            var sel = $(this).parent();
            if (sel.hasClass('select--active')) {
                sel.removeClass('select--active');
            } else {
                $('.select').removeClass('select--active');
                sel.addClass('select--active');
            }
        });

        $(document).on('click', '.select__item', function () {
            var val = $(this).find('.select__value').text(),
                sel = $(this).closest('.select');
            sel.removeClass('select--active');
            sel.find('.select__current').text(val);
        })
        $("body").click(function (e) {
            if ($(e.target).closest(".select--active").length === 0 && $('.select--active').length) {
                $(".select").removeClass('select--active');
            }
        });
    };

    /* Скролл на верх */
    let scrollTop = function () {
        $('.scroll-top').click(function () {
            $('html, body').animate({ scrollTop: 0 }, 1000);
        });
        $(window).scroll(function () {
            if ($(window).scrollTop() > 300) {
                $('.scroll-top').addClass('active');
            }
            else {
                $('.scroll-top').removeClass('active');
            }
        });
    };

    formValidate();
    customSelect();
    scrollTop();
    
});

//Parallax
var rellax = new Rellax('.rellax');

// Галерея
const lightbox = GLightbox({});

// Видео с ютуба
const myGallery = GLightbox({
    elements: [
        {
            'href': 'https://youtu.be/iErvlKMvzSo',
            'type': 'video',
            'source': 'youtube',
        }
    ],
});

let btn = document.getElementById('video')

btn.addEventListener('click', () => {
    myGallery.open();
})

// Меню бургер
const iconMenu = document.querySelector('.header__toggle');
const menuBody = document.querySelector('.header__body');
if (iconMenu) {
    iconMenu.addEventListener("click", function (e) {
        document.body.classList.toggle('lock');
        iconMenu.classList.toggle('active');
        menuBody.classList.toggle('active');
    });
}

// Табы 
const tabs = function () {
    let tabNav = document.querySelectorAll('.tabs__item'),
        tabContent = document.querySelectorAll('.tabs__content'),
        tabName;

    tabNav.forEach((item) => {
        item.addEventListener('click', selectTabNav)
    });

    function selectTabNav() {
        tabNav.forEach((item) => {
            item.classList.remove('active');
        });
        this.classList.add('active');
        tabName = this.getAttribute('data-tab-name');
        selectTabContent(tabName);
    }

    function selectTabContent(tab) {
        tabContent.forEach((item) => {
            let classList = item.classList;
            classList.contains(tab) ? classList.add('active') : classList.remove('active');
        });
    }
};

tabs();

// Прогресс бар
const progress = document.querySelector('.progress-bar');

window.addEventListener('scroll', progressBar);

function progressBar(e) {
    let windowScroll = document.body.scrollTop || document.documentElement.scrollTop
    let windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let per = windowScroll / windowHeight * 100;

    progress.style.width = per + '%';
}

// Анимация 
const animItems = document.querySelectorAll('.anim-items');
if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll);
    function animOnScroll() {
        for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 10;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }

            if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                animItem.classList.add('is-active');
            } else {
                if (!animItem.classList.contains('anim-no-hide')) {
                    animItem.classList.remove('is-active');
                }
            }

        }
    }
    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }
    setTimeout(() => {
        animOnScroll();
    }, 300);
}
