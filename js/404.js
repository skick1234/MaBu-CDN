!(function (Y, O) {
    "use strict"
    var S = "daisyjs"
    var M = Y.jQuery
    function s(n, o) {
        var r,
            s,
            e,
            a,
            h,
            p,
            l = !!O.createElement("canvas").getContext,
            d = [],
            f = 0,
            c = 0,
            x = !navigator.userAgent.match(
                /(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i,
            ),
            u = !!Y.DeviceOrientationEvent,
            m = 0,
            y = 0,
            i = !1
        function g() {
            ;(r.width = n.offsetWidth),
                (r.height = n.offsetHeight),
                (s.fillStyle = o.dotColor),
                (s.strokeStyle = o.lineColor),
                (s.lineWidth = o.lineWidth)
        }
        function w() {
            if (l) {
                ;(e = Y.innerWidth), (a = Y.innerHeight), s.clearRect(0, 0, r.width, r.height)
                for (var t = 0; t < d.length; t++) d[t].updatePosition()
                for (t = 0; t < d.length; t++) d[t].draw()
                i || requestAnimationFrame(w)
            }
        }
        function v() {
            switch (
                ((this.stackPos = this.stackPos),
                (this.active = !0),
                (this.layer = Math.ceil(3 * Math.random())),
                (this.parallaxOffsetX = 0),
                (this.parallaxOffsetY = 0),
                (this.position = { x: Math.ceil(Math.random() * r.width), y: Math.ceil(Math.random() * r.height) }),
                (this.speed = {}),
                o.directionX)
            ) {
                case "left":
                    this.speed.x = +(-o.maxSpeedX + Math.random() * o.maxSpeedX - o.minSpeedX).toFixed(2)
                    break
                case "right":
                    this.speed.x = +(Math.random() * o.maxSpeedX + o.minSpeedX).toFixed(2)
                    break
                default:
                    ;(this.speed.x = +(-o.maxSpeedX / 2 + Math.random() * o.maxSpeedX).toFixed(2)),
                        (this.speed.x += 0 < this.speed.x ? o.minSpeedX : -o.minSpeedX)
            }
            switch (o.directionY) {
                case "up":
                    this.speed.y = +(-o.maxSpeedY + Math.random() * o.maxSpeedY - o.minSpeedY).toFixed(2)
                    break
                case "down":
                    this.speed.y = +(Math.random() * o.maxSpeedY + o.minSpeedY).toFixed(2)
                    break
                default:
                    ;(this.speed.y = +(-o.maxSpeedY / 2 + Math.random() * o.maxSpeedY).toFixed(2)),
                        (this.speed.x += 0 < this.speed.y ? o.minSpeedY : -o.minSpeedY)
            }
        }
        function X(t) {
            void 0 !== o[t] && o[t].call(n)
        }
        return (
            (o = (function (t) {
                t = t || {}
                for (var i = 1; i < arguments.length; i++) {
                    var e = arguments[i]
                    if (e)
                        for (var a in e)
                            e.hasOwnProperty(a) && ("object" == typeof e[a] ? deepExtend(t[a], e[a]) : (t[a] = e[a]))
                }
                return t
            })({}, Y[S].defaults, o)),
            (v.prototype.draw = function () {
                s.beginPath(),
                    s.arc(
                        this.position.x + this.parallaxOffsetX,
                        this.position.y + this.parallaxOffsetY,
                        o.particleRadius / 2,
                        0,
                        2 * Math.PI,
                        !0,
                    ),
                    s.closePath(),
                    s.fill(),
                    s.beginPath()
                for (var t = d.length - 1; t > this.stackPos; t--) {
                    var i = d[t],
                        e = this.position.x - i.position.x,
                        a = this.position.y - i.position.y
                    Math.sqrt(e * e + a * a).toFixed(2) < o.proximity &&
                        (s.moveTo(this.position.x + this.parallaxOffsetX, this.position.y + this.parallaxOffsetY),
                        o.curvedLines
                            ? s.quadraticCurveTo(
                                  Math.max(i.position.x, i.position.x),
                                  Math.min(i.position.y, i.position.y),
                                  i.position.x + i.parallaxOffsetX,
                                  i.position.y + i.parallaxOffsetY,
                              )
                            : s.lineTo(i.position.x + i.parallaxOffsetX, i.position.y + i.parallaxOffsetY))
                }
                s.stroke(), s.closePath()
            }),
            (v.prototype.updatePosition = function () {
                if (o.parallax) {
                    if (u && !x) (h = (m - -30) * (e / 60) + 0), (p = (y - -30) * (a / 60) + 0)
                    else (h = f), (p = c)
                    ;(this.parallaxTargX = (h - e / 2) / (o.parallaxMultiplier * this.layer)),
                        (this.parallaxOffsetX += (this.parallaxTargX - this.parallaxOffsetX) / 10),
                        (this.parallaxTargY = (p - a / 2) / (o.parallaxMultiplier * this.layer)),
                        (this.parallaxOffsetY += (this.parallaxTargY - this.parallaxOffsetY) / 10)
                }
                var t = n.offsetWidth,
                    i = n.offsetHeight
                switch (o.directionX) {
                    case "left":
                        this.position.x + this.speed.x + this.parallaxOffsetX < 0 &&
                            (this.position.x = t - this.parallaxOffsetX)
                        break
                    case "right":
                        this.position.x + this.speed.x + this.parallaxOffsetX > t &&
                            (this.position.x = 0 - this.parallaxOffsetX)
                        break
                    default:
                        ;(this.position.x + this.speed.x + this.parallaxOffsetX > t ||
                            this.position.x + this.speed.x + this.parallaxOffsetX < 0) &&
                            (this.speed.x = -this.speed.x)
                }
                switch (o.directionY) {
                    case "up":
                        this.position.y + this.speed.y + this.parallaxOffsetY < 0 &&
                            (this.position.y = i - this.parallaxOffsetY)
                        break
                    case "down":
                        this.position.y + this.speed.y + this.parallaxOffsetY > i &&
                            (this.position.y = 0 - this.parallaxOffsetY)
                        break
                    default:
                        ;(this.position.y + this.speed.y + this.parallaxOffsetY > i ||
                            this.position.y + this.speed.y + this.parallaxOffsetY < 0) &&
                            (this.speed.y = -this.speed.y)
                }
                ;(this.position.x += this.speed.x), (this.position.y += this.speed.y)
            }),
            (v.prototype.setStackPos = function (t) {
                this.stackPos = t
            }),
            (function () {
                if (l) {
                    ;((r = O.createElement("canvas")).className = "pg-canvas"),
                        (r.style.display = "block"),
                        n.insertBefore(r, n.firstChild),
                        (s = r.getContext("2d")),
                        g()
                    for (var t = Math.round((r.width * r.height) / o.density), i = 0; i < t; i++) {
                        var e = new v()
                        e.setStackPos(i), d.push(e)
                    }
                    Y.addEventListener(
                        "resize",
                        function () {
                            !(function () {
                                g()
                                for (var t = n.offsetWidth, i = n.offsetHeight, e = d.length - 1; 0 <= e; e--)
                                    (d[e].position.x > t || d[e].position.y > i) && d.splice(e, 1)
                                var a = Math.round((r.width * r.height) / o.density)
                                if (a > d.length)
                                    for (; a > d.length; ) {
                                        var s = new v()
                                        d.push(s)
                                    }
                                else a < d.length && d.splice(a)
                                for (e = d.length - 1; 0 <= e; e--) d[e].setStackPos(e)
                            })()
                        },
                        !1,
                    ),
                        O.addEventListener(
                            "mousemove",
                            function (t) {
                                ;(f = t.pageX), (c = t.pageY)
                            },
                            !1,
                        ),
                        u &&
                            !x &&
                            Y.addEventListener(
                                "deviceorientation",
                                function () {
                                    ;(y = Math.min(Math.max(-event.beta, -30), 30)),
                                        (m = Math.min(Math.max(-event.gamma, -30), 30))
                                },
                                !0,
                            ),
                        w(),
                        X("onInit")
                }
            })(),
            {
                option: function (t, i) {
                    if (!i) return o[t]
                    o[t] = i
                },
                destroy: function () {
                    console.log("destroy"),
                        r.parentNode.removeChild(r),
                        X("onDestroy"),
                        M && M(n).removeData("plugin_" + S)
                },
                start: function () {
                    ;(i = !1), w()
                },
                pause: function () {
                    i = !0
                },
            }
        )
    }
    ;(Y[S] = function (t, i) {
        return new s(t, i)
    }),
        (Y[S].defaults = {
            minSpeedX: 0.1,
            maxSpeedX: 0.7,
            minSpeedY: 0.1,
            maxSpeedY: 0.7,
            directionX: "center",
            directionY: "center",
            density: 1e4,
            dotColor: "#666666",
            lineColor: "#666666",
            particleRadius: 7,
            lineWidth: 1,
            curvedLines: !1,
            proximity: 100,
            parallax: !0,
            parallaxMultiplier: 5,
            onInit: function () {},
            onDestroy: function () {},
        }),
        M &&
            (M.fn[S] = function (t) {
                if ("string" == typeof t) {
                    var i,
                        e = t,
                        a = Array.prototype.slice.call(arguments, 1)
                    return (
                        this.each(function () {
                            M.data(this, "plugin_" + S) &&
                                "function" == typeof M.data(this, "plugin_" + S)[e] &&
                                (i = M.data(this, "plugin_" + S)[e].apply(this, a))
                        }),
                        void 0 !== i ? i : this
                    )
                }
                if ("object" == typeof t || !t)
                    return this.each(function () {
                        M.data(this, "plugin_" + S) || M.data(this, "plugin_" + S, new s(this, t))
                    })
            })
})(window, document),
    (function () {
        for (var n = 0, t = ["ms", "moz", "webkit", "o"], i = 0; i < t.length && !window.requestAnimationFrame; ++i)
            (window.requestAnimationFrame = window[t[i] + "RequestAnimationFrame"]),
                (window.cancelAnimationFrame =
                    window[t[i] + "CancelAnimationFrame"] || window[t[i] + "CancelRequestAnimationFrame"])
        window.requestAnimationFrame ||
            (window.requestAnimationFrame = function (t, i) {
                var e = new Date().getTime(),
                    a = Math.max(0, 16 - (e - n)),
                    s = window.setTimeout(function () {
                        t(e + a)
                    }, a)
                return (n = e + a), s
            }),
            window.cancelAnimationFrame ||
                (window.cancelAnimationFrame = function (t) {
                    clearTimeout(t)
                })
    })()
daisyjs(document.getElementById("particles-foreground"), {
    dotColor: "rgba(255, 255, 255, 1)",
    lineColor: "rgba(255, 255, 255, 0.3)",
    minSpeedX: 0.3,
    maxSpeedX: 0.6,
    minSpeedY: 0.3,
    maxSpeedY: 0.6,
    density: 150000,
    curvedLines: false,
    proximity: 300,
    parallaxMultiplier: 5,
    particleRadius: 8,
})

daisyjs(document.getElementById("particles-background"), {
    dotColor: "rgba(255, 255, 255, 0.5)",
    lineColor: "rgba(255, 255, 255, 0.1)",
    minSpeedX: 0.15,
    maxSpeedX: 0.3,
    minSpeedY: 0.15,
    maxSpeedY: 0.3,
    density: 75000,
    curvedLines: false,
    proximity: 150,
    parallaxMultiplier: 10,
    particleRadius: 4,
})
