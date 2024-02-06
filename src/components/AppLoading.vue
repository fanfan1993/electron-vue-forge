<template>
    <div class="app-loading">
        <div class="loading-wrapper">
            <span class="loading-letter" data-preloader="L">L</span>
            <span class="loading-letter" data-preloader="O">O</span>
            <span class="loading-letter" data-preloader="A">A</span>
            <span class="loading-letter" data-preloader="D">D</span>
            <span class="loading-letter" data-preloader="I">I</span>
            <span class="loading-letter" data-preloader="N">N</span>
            <span class="loading-letter" data-preloader="G">G</span>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.app-loading {
    width: 100%;
    height: 100vh;
    position: relative;
    background-color: #004677;

    .loading-wrapper {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 999;
        -webkit-transform: translate3d(-50%, -50%, 0);
        transform: translate3d(-50%, -50%, 0);

        .loading-letter:before {
            -webkit-animation-name: cp-preloader4;
            animation-name: app-loading;
        }

        .loading-letter {
            display: inline-block;
            position: relative;
            overflow: hidden;
            color: rgba(255, 255, 255, 0.3);
            font-size: 4rem;
            letter-spacing: 1rem;

            &:before {
                content: attr(data-preloader);
                position: absolute;
                top: 0;
                left: 0;
                -webkit-animation-duration: 3s;
                animation-duration: 3s;
                -webkit-animation-iteration-count: infinite;
                animation-iteration-count: infinite;
                -webkit-animation-fill-mode: backwards;
                animation-fill-mode: backwards;
                color: #ffffff;
            }

            &:nth-child(2):before {
                -webkit-animation-delay: 0.3s;
                animation-delay: 0.3s;
            }

            &:nth-child(3):before {
                -webkit-animation-delay: 0.45s;
                animation-delay: 0.45s;
            }

            &:nth-child(4):before {
                -webkit-animation-delay: 0.6s;
                animation-delay: 0.6s;
            }

            &:nth-child(5):before {
                -webkit-animation-delay: 0.75s;
                animation-delay: 0.75s;
            }

            &:nth-child(6):before {
                -webkit-animation-delay: 0.9s;
                animation-delay: 0.9s;
            }

            &:nth-child(7):before {
                -webkit-animation-delay: 1.05s;
                animation-delay: 1.05s;
            }
        }
    }
}

@keyframes app-loading {

    0%,
    100% {
        -webkit-transform: rotateY(-90deg) scale(1);
        transform: rotateY(-90deg) scale(1);
        opacity: 0;
    }

    20%,
    50% {
        -webkit-transform: rotateY(0) scale(1);
        transform: rotateY(0) scale(1);
        opacity: 1;
    }

    75% {
        -webkit-transform: rotateY(0) scale(1.2);
        transform: rotateY(0) scale(1.2);
        opacity: 0;
    }
}
</style>