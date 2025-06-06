/*!
 * pagepiling.js 1.5.6
 *
 * https://github.com/alvarotrigo/pagePiling.js
 * @license MIT licensed
 *
 * Copyright (C) 2016 alvarotrigo.com - A project by Alvaro Trigo
 */
! function(e, n, t, o) {
    "use strict";
    e.fn.pagepiling = function(i) {
        function a(e) {
            e.addClass("pp-table").wrapInner('<div class="pp-tableCell" style="height:100%" />')
        }

        function s(n) {
            var t = e(".pp-section.active").index(".pp-section"),
                o = n.index(".pp-section");
            return t > o ? "up" : "down"
        }

        function c(n, t) {
            var o = {
                destination: n,
                animated: t,
                activeSection: e(".pp-section.active"),
                anchorLink: n.data("anchor"),
                sectionIndex: n.index(".pp-section"),
                toMove: n,
                yMovement: s(n),
                leavingSection: e(".pp-section.active").index(".pp-section") + 1
            };
            if (!o.activeSection.is(n)) {
                "undefined" == typeof o.animated && (o.animated = !0), "undefined" != typeof o.anchorLink && v(o.anchorLink, o.sectionIndex), o.destination.addClass("active").siblings().removeClass("active"), o.sectionsToMove = p(o), "down" === o.yMovement ? (o.translate3d = U(), o.scrolling = "-100%", Z.css3 || o.sectionsToMove.each(function(n) {
                    n != o.activeSection.index(".pp-section") && e(this).css(u(o.scrolling))
                }), o.animateSection = o.activeSection) : (o.translate3d = "translate3d(0px, 0px, 0px)", o.scrolling = "0", o.animateSection = n), e.isFunction(Z.onLeave) && Z.onLeave.call(this, o.leavingSection, o.sectionIndex + 1, o.yMovement), r(o), A(o.anchorLink), z(o.anchorLink, o.sectionIndex), W = o.anchorLink;
                var i = (new Date).getTime();
                Q = i
            }
        }

        function r(n) {
            Z.css3 ? (w(n.animateSection, n.translate3d, n.animated), n.sectionsToMove.each(function() {
                w(e(this), n.translate3d, n.animated)
            }), setTimeout(function() {
                l(n)
            }, Z.scrollingSpeed)) : (n.scrollOptions = u(n.scrolling), n.animated ? n.animateSection.animate(n.scrollOptions, Z.scrollingSpeed, Z.easing, function() {
                d(n), l(n)
            }) : (n.animateSection.css(u(n.scrolling)), setTimeout(function() {
                d(n), l(n)
            }, 400)))
        }

        function l(n) {
            e.isFunction(Z.afterLoad) && Z.afterLoad.call(this, n.anchorLink, n.sectionIndex + 1)
        }

        function p(n) {
            var t;
            return t = "down" === n.yMovement ? e(".pp-section").map(function(t) {
                if (t < n.destination.index(".pp-section")) return e(this)
            }) : e(".pp-section").map(function(t) {
                if (t > n.destination.index(".pp-section")) return e(this)
            })
        }

        function d(n) {
            "up" === n.yMovement && n.sectionsToMove.each(function(t) {
                e(this).css(u(n.scrolling))
            })
        }

        function u(e) {
            return "vertical" === Z.direction ? {
                top: e
            } : {
                left: e
            }
        }

        function v(e, n) {
            Z.anchors.length ? (location.hash = e, f(location.hash)) : f(String(n))
        }

        function f(n) {
            n = n.replace("#", ""), e("body")[0].className = e("body")[0].className.replace(/\b\s?pp-viewing-[^\s]+\b/g, ""), e("body").addClass("pp-viewing-" + n)
        }

        function h() {
            var o = t.location.hash.replace("#", ""),
                i = o,
                a = e(n).find('.pp-section[data-anchor="' + i + '"]');
            a.length > 0 && c(a, Z.animateAnchor)
        }

        function m() {
            var e = (new Date).getTime();
            return e - Q < J + Z.scrollingSpeed
        }

        function g() {
            var o = t.location.hash.replace("#", "").split("/"),
                i = o[0];
            if (i.length && i && i !== W) {
                var a;
                a = isNaN(i) ? e(n).find('[data-anchor="' + i + '"]') : e(".pp-section").eq(i - 1), c(a)
            }
        }

        function S(e) {
            return {
                "-webkit-transform": e,
                "-moz-transform": e,
                "-ms-transform": e,
                transform: e
            }
        }

        function w(e, n, t) {
            e.toggleClass("pp-easing", t), e.css(S(n))
        }

        function b(n) {
            var o = (new Date).getTime();
            n = n || t.event;
            var i = n.wheelDelta || -n.deltaY || -n.detail,
                a = Math.max(-1, Math.min(1, i)),
                s = "undefined" != typeof n.wheelDeltaX || "undefined" != typeof n.deltaX,
                c = Math.abs(n.wheelDeltaX) < Math.abs(n.wheelDelta) || Math.abs(n.deltaX) < Math.abs(n.deltaY) || !s;
            G.length > 149 && G.shift(), G.push(Math.abs(i));
            var r = o - _;
            if (_ = o, r > 200 && (G = []), !m()) {
                var l = e(".pp-section.active"),
                    p = T(l),
                    d = y(G, 10),
                    u = y(G, 70),
                    v = d >= u;
                return v && c && (a < 0 ? x("down", p) : a > 0 && x("up", p)), !1
            }
        }

        function y(e, n) {
            for (var t = 0, o = e.slice(Math.max(e.length - n, 1)), i = 0; i < o.length; i++) t += o[i];
            return Math.ceil(t / n)
        }

        function x(e, n) {
            var t, o;
            if ("down" == e ? (t = "bottom", o = B.moveSectionDown) : (t = "top", o = B.moveSectionUp), n.length > 0) {
                if (!M(t, n)) return !0;
                o()
            } else o()
        }

        function M(e, n) {
            return "top" === e ? !n.scrollTop() : "bottom" === e ? n.scrollTop() + 1 + n.innerHeight() >= n[0].scrollHeight : void 0
        }

        function T(e) {
            return e.filter(".pp-scrollable")
        }

        function C() {
            F.get(0).addEventListener ? (F.get(0).removeEventListener("mousewheel", b, !1), F.get(0).removeEventListener("wheel", b, !1)) : F.get(0).detachEvent("onmousewheel", b)
        }

        function k() {
            F.length && (F.get(0).addEventListener ? (F.get(0).addEventListener("mousewheel", b, !1), F.get(0).addEventListener("wheel", b, !1)) : F.get(0).attachEvent("onmousewheel", b))
        }

        function E() {
            if (R) {
                var e = D();
                F.off("touchstart " + e.down).on("touchstart " + e.down, P), F.off("touchmove " + e.move).on("touchmove " + e.move, Y)
            }
        }

        function L() {
            if (R) {
                var e = D();
                F.off("touchstart " + e.down), F.off("touchmove " + e.move)
            }
        }

        function D() {
            var e;
            return e = t.PointerEvent ? {
                down: "pointerdown",
                move: "pointermove",
                up: "pointerup"
            } : {
                down: "MSPointerDown",
                move: "MSPointerMove",
                up: "MSPointerUp"
            }
        }

        function I(e) {
            var n = new Array;
            return n.y = "undefined" != typeof e.pageY && (e.pageY || e.pageX) ? e.pageY : e.touches[0].pageY, n.x = "undefined" != typeof e.pageX && (e.pageY || e.pageX) ? e.pageX : e.touches[0].pageX, n
        }

        function X(e) {
            return "undefined" == typeof e.pointerType || "mouse" != e.pointerType
        }

        function P(e) {
            var n = e.originalEvent;
            if (X(n)) {
                var t = I(n);
                j = t.y, H = t.x
            }
        }

        function Y(n) {
            var t = n.originalEvent;
            if (!N(n.target) && X(t)) {
                var o = e(".pp-section.active"),
                    i = T(o);
                if (i.length || n.preventDefault(), !m()) {
                    var a = I(t);
                    K = a.y, V = a.x, "horizontal" === Z.direction && Math.abs(H - V) > Math.abs(j - K) ? Math.abs(H - V) > F.width() / 100 * Z.touchSensitivity && (H > V ? x("down", i) : V > H && x("up", i)) : Math.abs(j - K) > F.height() / 100 * Z.touchSensitivity && (j > K ? x("down", i) : K > j && x("up", i))
                }
            }
        }

        function N(n, t) {
            t = t || 0;
            var o = e(n).parent();
            return !!(t < Z.normalScrollElementTouchThreshold && o.is(Z.normalScrollElements)) || t != Z.normalScrollElementTouchThreshold && N(o, ++t)
        }

        function q() {
            e("body").append('<div id="pp-nav"><ul></ul></div>');
            var n = e("#pp-nav");
            n.css("color", Z.navigation.textColor), n.addClass(Z.navigation.position);
            for (var t = 0; t < e(".pp-section").length; t++) {
                var o = "";
                if (Z.anchors.length && (o = Z.anchors[t]), "undefined" !== Z.navigation.tooltips) {
                    var i = Z.navigation.tooltips[t];
                    "undefined" == typeof i && (i = "")
                }
                n.find("ul").append('<li data-tooltip="' + i + '"><a href="#' + o + '"><span></span></a></li>')
            }
            n.find("span").css("border-color", Z.navigation.bulletsColor)
        }

        function z(n, t) {
            Z.navigation && (e("#pp-nav").find(".active").removeClass("active"), n ? e("#pp-nav").find('a[href="#' + n + '"]').addClass("active") : e("#pp-nav").find("li").eq(t).find("a").addClass("active"))
        }

        function A(n) {
            Z.menu && (e(Z.menu).find(".active").removeClass("active"), e(Z.menu).find('[data-menuanchor="' + n + '"]').addClass("active"))
        }

        function O() {
            var e, i = n.createElement("p"),
                a = {
                    webkitTransform: "-webkit-transform",
                    OTransform: "-o-transform",
                    msTransform: "-ms-transform",
                    MozTransform: "-moz-transform",
                    transform: "transform"
                };
            n.body.insertBefore(i, null);
            for (var s in a) i.style[s] !== o && (i.style[s] = "translate3d(1px,1px,1px)", e = t.getComputedStyle(i).getPropertyValue(a[s]));
            return n.body.removeChild(i), e !== o && e.length > 0 && "none" !== e
        }

        function U() {
            return "vertical" !== Z.direction ? "translate3d(-100%, 0px, 0px)" : "translate3d(0px, -100%, 0px)"
        }
        var W, B = e.fn.pagepiling,
            F = e(this),
            Q = 0,
            R = "ontouchstart" in t || navigator.msMaxTouchPoints > 0 || navigator.maxTouchPoints,
            j = 0,
            H = 0,
            K = 0,
            V = 0,
            G = [],
            J = 600,
            Z = e.extend(!0, {
                direction: "vertical",
                menu: null,
                verticalCentered: !0,
                sectionsColor: [],
                anchors: [],
                scrollingSpeed: 700,
                easing: "easeInQuart",
                loopBottom: !1,
                loopTop: !1,
                css3: !0,
                navigation: {
                    textColor: "#000",
                    bulletsColor: "#000",
                    position: "right",
                    tooltips: []
                },
                normalScrollElements: null,
                normalScrollElementTouchThreshold: 5,
                touchSensitivity: 5,
                keyboardScrolling: !0,
                sectionSelector: ".section",
                animateAnchor: !1,
                afterLoad: null,
                onLeave: null,
                afterRender: null
            }, i);
        e.extend(e.easing, {
            easeInQuart: function(e, n, t, o, i) {
                return o * (n /= i) * n * n * n + t
            }
        }), B.setScrollingSpeed = function(e) {
            Z.scrollingSpeed = e
        }, B.setMouseWheelScrolling = function(e) {
            e ? k() : C()
        }, B.setAllowScrolling = function(e) {
            e ? (B.setMouseWheelScrolling(!0), E()) : (B.setMouseWheelScrolling(!1), L())
        }, B.setKeyboardScrolling = function(e) {
            Z.keyboardScrolling = e
        }, B.moveSectionUp = function() {
            var n = e(".pp-section.active").prev(".pp-section");
            !n.length && Z.loopTop && (n = e(".pp-section").last()), n.length && c(n)
        }, B.moveSectionDown = function() {
            var n = e(".pp-section.active").next(".pp-section");
            !n.length && Z.loopBottom && (n = e(".pp-section").first()), n.length && c(n)
        }, B.moveTo = function(t) {
            var o = "";
            o = isNaN(t) ? e(n).find('[data-anchor="' + t + '"]') : e(".pp-section").eq(t - 1), o.length > 0 && c(o)
        }, e(Z.sectionSelector).each(function() {
            e(this).addClass("pp-section")
        }), Z.css3 && (Z.css3 = O()), e(F).css({
            overflow: "hidden",
            "-ms-touch-action": "none",
            "touch-action": "none"
        }), B.setAllowScrolling(!0), e.isEmptyObject(Z.navigation) || q();
        var $ = e(".pp-section").length;
        e(".pp-section").each(function(n) {
            e(this).data("data-index", n), e(this).css("z-index", $), n || 0 !== e(".pp-section.active").length || e(this).addClass("active"), "undefined" != typeof Z.anchors[n] && e(this).attr("data-anchor", Z.anchors[n]), "undefined" != typeof Z.sectionsColor[n] && e(this).css("background-color", Z.sectionsColor[n]), Z.verticalCentered && !e(this).hasClass("pp-scrollable") && a(e(this)), $ -= 1
        }).promise().done(function() {
            Z.navigation && (e("#pp-nav").css("margin-top", "-" + e("#pp-nav").height() / 2 + "px"), e("#pp-nav").find("li").eq(e(".pp-section.active").index(".pp-section")).find("a").addClass("active")), e(t).on("load", function() {
                h()
            }), e.isFunction(Z.afterRender) && Z.afterRender.call(this)
        }), e(t).on("hashchange", g), e(n).keydown(function(n) {
            if (Z.keyboardScrolling && !m()) switch (n.which) {
                case 38:
                case 33:
                    B.moveSectionUp();
                    break;
                case 40:
                case 34:
                    B.moveSectionDown();
                    break;
                case 36:
                    B.moveTo(1);
                    break;
                case 35:
                    B.moveTo(e(".pp-section").length);
                    break;
                case 37:
                    B.moveSectionUp();
                    break;
                case 39:
                    B.moveSectionDown();
                    break;
                default:
                    return
            }
        }), Z.normalScrollElements && (e(n).on("mouseenter", Z.normalScrollElements, function() {
            B.setMouseWheelScrolling(!1)
        }), e(n).on("mouseleave", Z.normalScrollElements, function() {
            B.setMouseWheelScrolling(!0)
        }));
        var _ = (new Date).getTime();
        e(n).on("click touchstart", "#pp-nav a", function(n) {
            n.preventDefault();
            var t = e(this).parent().index();
            c(e(".pp-section").eq(t))
        }), e(n).on({
            mouseenter: function() {
                var n = e(this).data("tooltip");
                e('<div class="pp-tooltip ' + Z.navigation.position + '">' + n + "</div>").hide().appendTo(e(this)).fadeIn(200)
            },
            mouseleave: function() {
                e(this).find(".pp-tooltip").fadeOut(200, function() {
                    e(this).remove()
                })
            }
        }, "#pp-nav li")
    }
}(jQuery, document, window);