<template>
    <div class="page-footer">
        <div class="footer-content">
            <p lang="zh-CN">Copyright &copy; 2025</p>
            <p>ee268</p>
        </div>
        <div class="github-info">
            <div class="github-icon"></div>
            <div class="github-link">
                <a href="#">123</a>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.page-footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    row-gap: 10px;

    .footer-content {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 10px;

        p {
            margin: 0;
        }

        p:last-child {
            background: linear-gradient(to right,
                    red, orange, yellow, green, blue, indigo, violet,
                    red, orange, yellow, green, blue, indigo, violet);
            background-size: 220% 100%;
            background-position: 0 0;
            background-clip: text;
            color: transparent;
            animation: rainbow-flow 5s linear infinite;
        }
    }

    .github-info {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        .github-icon {
            width: 20px;
            height: 20px;
            background: url('/src/assets/github.svg') no-repeat center;
            background-size: cover;
        }

        .github-link {
            margin-left: 10px;

            a {
                color: #000;
                text-decoration: none;

                &:hover {
                    background: linear-gradient(to right,
                            red, orange, yellow, green, blue, indigo, violet,
                            red, orange, yellow, green, blue, indigo, violet);
                    background-size: 220% 100%;
                    background-position: 0 0;
                    background-clip: text;
                    color: transparent;
                }
            }
        }
    }
}

@keyframes rainbow-flow {
    0% {
        background-position: 0 0;
    }

    100% {
        background-position: 100% 0;
    }
}
</style>