
const 
	body = document.querySelector('body'),
	html = document.querySelector('html'),
	menu = document.querySelectorAll('.header__burger, .header__nav, body'),
	burger = document.querySelector('.header__burger'),
	header = document.querySelector('.header');


// =-=-=-=-=-=-=-=-=-=- <image-aspect-ratio> -=-=-=-=-=-=-=-=-=-=-

const imageBody = document.querySelectorAll('.image-body');
imageBody.forEach(imageBody => {
	
	const img = imageBody.querySelector('img');
	if(img) {
		if(img.getAttribute('width') && img.getAttribute('height')) {
			imageBody.style.paddingTop = Number(img.getAttribute('height')) / Number(img.getAttribute('width')) * 100 + '%';
		}
		
	}
	
})

const figure = document.querySelectorAll('figure:not(.wp-block-gallery)');
figure.forEach(figure => {
	figure.insertAdjacentHTML("beforeend", `<div class="image-filter"></div>`);
})

const imageFilter = document.querySelectorAll('.image-filter'),
	  imageFilterBase = document.querySelector('.image-filter-base').dataset.url;
imageFilter.forEach(imageFilter => {
	imageFilter.style.backgroundImage = `url(${imageFilterBase})`;
})

// =-=-=-=-=-=-=-=-=-=- </image-aspect-ratio> -=-=-=-=-=-=-=-=-=-=-



// =-=-=-=-=-=-=-=-=-=- <Get-device-type> -=-=-=-=-=-=-=-=-=-=-

const getDeviceType = () => {

	const ua = navigator.userAgent;
	if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
		return "tablet";
	}

	if (
		/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
		ua
		)
	) {
		return "mobile";
	}
	return "desktop";

};

// =-=-=-=-=-=-=-=-=-=- </Get-device-type> -=-=-=-=-=-=-=-=-=-=-




// =-=-=-=-=-=-=-=-=-=- <click events> -=-=-=-=-=-=-=-=-=-=-

body.addEventListener('click', function (event) {

	function $(elem) {
		return event.target.closest(elem)
	}

	// =-=-=-=-=-=-=-=-=-=- <open menu in header> -=-=-=-=-=-=-=-=-=-=-

	if ($('.header__burger')) {
		menu.forEach(element => {
			element.classList.toggle('_mob-menu-active')
		})
	}

	// =-=-=-=-=-=-=-=-=-=- </open menu in header> -=-=-=-=-=-=-=-=-=-=-



	// =-=-=-=-=-=-=-=-=-=-=-=- <header-drop-down-menu> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const headerNavLink = $(".header__nav--list > li:has(ul) > a");
	if(headerNavLink && getDeviceType() != "desktop") {
	
		if(!headerNavLink.classList.contains('active')) {

			document.querySelectorAll('.header__nav--list > li:has(ul) > a.active').forEach(activeLink => {
				activeLink.classList.remove('active');
			})

			headerNavLink.classList.add('active');
			event.preventDefault();
		} else {
			headerNavLink.classList.remove('active');
		}
	
	} else if(document.querySelector(".header__nav--list > li:has(ul) > a.active")) {
		document.querySelector(".header__nav--list > li:has(ul) > a.active").classList.remove('active');
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </header-drop-down-menu> -=-=-=-=-=-=-=-=-=-=-=-=



	// =-=-=-=-=-=-=-=-=-=-=-=- <blog-page-nav-anchor-link> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const blogPageNavContentLink = $(".blog-page__nav-content--block a");
	if(blogPageNavContentLink) {
	
		event.preventDefault();
		let section = blogPageNavContentLink.getAttribute('href');
		if(section.length > 1) {
			section = document.querySelector(section);
		}
	
		if(section) {
			//section.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
			//window.history("", "", )
			history.pushState('', "", "#" + section.getAttribute('id'));
			window.scrollTo({
				top: section.offsetTop,
				left: 0,
				behavior: "smooth"
			})
		}
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </blog-page-nav-anchor-link> -=-=-=-=-=-=-=-=-=-=-=-=
	


	// =-=-=-=-=-=-=-=-=-=-=-=- <blog-page-accordion> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const blogPageNavContentTarget = $(".blog-page__nav-content--target")
	if(blogPageNavContentTarget) {

		if(!blogPageNavContentTarget.classList.contains('_animating')) {
			blogPageNavContentTarget.classList.add('_animating');

			const parent = blogPageNavContentTarget.parentElement,
			block = parent.querySelector('.blog-page__nav-content--block');
	
			if(parent.classList.contains('_active')) {
				block.style.display = 'block';
				parent.classList.remove('_active')
				slideUp(block);
			} else {
				parent.classList.add('_active');
				slideDown(block);
			}

			setTimeout(() => {
				blogPageNavContentTarget.classList.remove('_animating');
			},300)
		}
	
		

	
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </blog-page-accordion> -=-=-=-=-=-=-=-=-=-=-=-=
	

})

// =-=-=-=-=-=-=-=-=-=- </click events> -=-=-=-=-=-=-=-=-=-=-



const btn = document.querySelectorAll('.btn');
btn.forEach(btn => {
	btn.addEventListener('mouseenter', function (event) {
		btn.parentElement.classList.add('_hover');
		btn.classList.remove('_blur');
		setTimeout(() => {
			if(!btn.classList.contains('_blur')) {
				btn.parentElement.classList.add('_hover-delay');
			}
			
		},300)
	});

	btn.addEventListener('mousemove', function (event) {
		const widthBox = btn.offsetWidth / 2, heightBox = btn.offsetHeight / 2, min = (btn.classList.contains('_min')) ? 3 : 5;
		
		btn.style.transform = `rotateX(${-(event.offsetY - heightBox) / min}deg) rotateY(${(event.offsetX - widthBox) / min}deg) translateZ(30px)`;
		//("transform", "rotateX(" + -(e.offsetY - heightBox) / 20 + "deg) rotateY(" + (e.offsetX - widthBox) / 20 + "deg) translate3d(0, 0, 45px)")
	})

	btn.addEventListener('mouseleave', function (event) {
		btn.style.transform = 'translateZ(0px)';
		/* btn.style.transition = 'transform .4s ease';
		setTimeout(() => {
			btn.style.removeProperty("transition");
		},500) */
		btn.classList.add('_blur');
		btn.parentElement.classList.remove('_hover');
		btn.parentElement.classList.remove('_hover-delay');
		//("transform", "rotateX(" + -(e.offsetY - heightBox) / 20 + "deg) rotateY(" + (e.offsetX - widthBox) / 20 + "deg) translate3d(0, 0, 45px)")
	})
})



// =-=-=-=-=-=-=-=-=-=-=-=- <resize> -=-=-=-=-=-=-=-=-=-=-=-=

function resize() {

	html.style.setProperty("--height-header", header.offsetHeight + "px");
	html.style.setProperty("--vh", window.innerHeight * 0.01 + "px");

}

resize();

window.onresize = resize;

// =-=-=-=-=-=-=-=-=-=-=-=- </resize> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <lazyload> -=-=-=-=-=-=-=-=-=-=-=-=

new LazyLoad();

// =-=-=-=-=-=-=-=-=-=-=-=- </lazyload> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <popup> -=-=-=-=-=-=-=-=-=-=-=-=

function Popup(arg) {

	let body = document.querySelector('body'),
		html = document.querySelector('html'),
		saveHref = (typeof arg == 'object') ? (arg['saveHref']) ? true : false : false,
		popupCheck = true,
		popupCheckClose = true;

	const removeHash = function () {
		let uri = window.location.toString();
		if (uri.indexOf("#") > 0) {
			let clean_uri = uri.substring(0, uri.indexOf("#"));
			window.history.replaceState({}, document.title, clean_uri);
		}
	}

	const open = function (id, initStart) {

		if (popupCheck) {
			popupCheck = false;

			let popup = document.querySelector(id);

			if (popup) {

				if(popup.classList.contains('popup')) {

					body.classList.remove('_popup-active');
					html.style.setProperty('--popup-padding', window.innerWidth - body.offsetWidth + 'px');
					body.classList.add('_popup-active');

					if (saveHref) history.pushState('', "", id);

					setTimeout(() => {
						if (!initStart) {
							popup.classList.add('_active');
							function openFunc() {
								popupCheck = true;
								popup.removeEventListener('transitionend', openFunc);
							}
							popup.addEventListener('transitionend', openFunc)
						} else {
							popup.classList.add('_transition-none');
							popup.classList.add('_active');
							popupCheck = true;
						}

					}, 0)
				}

			} else {
				return new Error(`Not found "${id}"`)
			}
		}
	}

	const close = function (popupClose) {
		if (popupCheckClose) {
			popupCheckClose = false;

			let popup
			if (typeof popupClose === 'string') {
				popup = document.querySelector(popupClose)
			} else {
				popup = popupClose.closest('.popup');
			}

			if (popup.classList.contains('_transition-none')) popup.classList.remove('_transition-none')

			setTimeout(() => {
				popup.classList.remove('_active');
				function closeFunc() {
					setTimeout(() => {
						const activePopups = document.querySelectorAll('.popup._active');

						if (activePopups.length < 1) {
							body.classList.remove('_popup-active');
							html.style.setProperty('--popup-padding', '0px');
						}

						if (saveHref) {
							removeHash();
							if (activePopups[activePopups.length - 1]) {
								history.pushState('', "", "#" + activePopups[activePopups.length - 1].getAttribute('id'));
							}
						}

						popupCheckClose = true;
						popup.removeEventListener('transitionend', closeFunc)
					},100)
				}

				popup.addEventListener('transitionend', closeFunc)

			}, 0)

		}
	}

	return {

		open: function (id) {
			open(id);
		},

		close: function (popupClose) {
			close(popupClose)
		},

		init: function () {

			let thisTarget
			body.addEventListener('click', function (event) {

				thisTarget = event.target;

				let popupOpen = thisTarget.closest('.open-popup');
				if (popupOpen) {
					event.preventDefault();
					open(popupOpen.getAttribute('href'))
				}

				let popupClose = thisTarget.closest('.popup-close');
				if (popupClose) {
					close(popupClose)
				}

			});

			if (saveHref) {
				let url = new URL(window.location);
				if (url.hash) {
					open(url.hash, true);
				}
			}
		},

	}
}

const popup = new Popup();

popup.init()

// =-=-=-=-=-=-=-=-=-=-=-=- </popup> -=-=-=-=-=-=-=-=-=-=-=-=

function slideUp (target, duration=300) {
	target.style.transitionProperty = 'height, margin, padding';
	target.style.transitionDuration = duration + 'ms';
	target.style.boxSizing = 'border-box';
	target.style.height = target.offsetHeight + 'px';
	target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	window.setTimeout( () => {
	  target.style.display = 'none';
	  target.style.removeProperty('height');
	  target.style.removeProperty('padding-top');
	  target.style.removeProperty('padding-bottom');
	  target.style.removeProperty('margin-top');
	  target.style.removeProperty('margin-bottom');
	  target.style.removeProperty('overflow');
	  target.style.removeProperty('transition-duration');
	  target.style.removeProperty('transition-property');
	}, duration);
}

function slideDown (target, duration=300) {
	target.style.removeProperty('display');
	let display = window.getComputedStyle(target).display;

	if (display === 'none')
	  display = 'block';

	target.style.display = display;
	let height = target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	target.offsetHeight;
	target.style.boxSizing = 'border-box';
	target.style.transitionProperty = "height, margin, padding";
	target.style.transitionDuration = duration + 'ms';
	target.style.height = height + 'px';
	target.style.removeProperty('padding-top');
	target.style.removeProperty('padding-bottom');
	target.style.removeProperty('margin-top');
	target.style.removeProperty('margin-bottom');
	window.setTimeout( () => {
	  target.style.removeProperty('height');
	  target.style.removeProperty('overflow');
	  target.style.removeProperty('transition-duration');
	  target.style.removeProperty('transition-property');
	}, duration);
}

