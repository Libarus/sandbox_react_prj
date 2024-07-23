import { FC, useEffect, useRef } from "react";

let x: number = 20;
let y: number = 20;

let dx: number = 5;
let dy: number = 5;

const balls: any = [];

for (let i = 0; i < 500; i++) {
    balls.push({
        x: Math.random() * 800,
        y: Math.random() * 600,
        radius: Math.random() * 20 + 10,
        color: '#' + Math.floor(Math.random() * 16777215).toString(16),
        speedX: Math.random() * 10 - 2,
        speedY: Math.random() * 10 - 2
    });
}

function getMousePos(canvas: any, evt: any) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

const Schedule: FC<{}> = () => {
    const canvasRef1 = useRef(null);
    const canvasRef2 = useRef(null);

    useEffect(() => {
        // Получаем контекст 2D для рисования
        const ctx1 = canvasRef1.current.getContext('2d');
        const ctx2 = canvasRef2.current.getContext('2d');

        canvasRef1.current.addEventListener('mousemove', (event: Event) => {
            const pos = getMousePos(canvasRef1.current, event);
            x = pos.x;
            y = pos.y;  
        });

        // Функция для рисования круга
        const drawCircle = (ctx: any, x: number, y: number, radius: number, color: string) => {
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, 2 * Math.PI);
            ctx.fillStyle = color;
            ctx.fill();
        };

        // Анимация
        const animate = () => {

            ctx1.clearRect(0, 0, 800, 600);
            ctx1.beginPath();

            ctx2.clearRect(0, 0, 800, 600);
            ctx2.beginPath();

            // Здесь должна быть логика анимации
            // Например, перемещение кругов

            drawCircle(ctx1, x, y, 20, 'red');

            balls.forEach((ball: any) => {
                ball.x += ball.speedX;
                ball.y += ball.speedY;

                if (ball.x + ball.radius > 800 || ball.x - ball.radius < 0) {
                    ball.speedX = -ball.speedX;
                }

                if (ball.y + ball.radius > 600 || ball.y - ball.radius < 0) {
                    ball.speedY = -ball.speedY;
                }

                drawCircle(ctx2, ball.x, ball.y, ball.radius, ball.color);
            });

            ctx1.closePath();

            requestAnimationFrame(animate);
        };

        // Запускаем анимацию
        animate();
    }, []);

    return (
        <>
            <canvas ref={canvasRef1} width={800} height={600} />
            <canvas ref={canvasRef2} width={800} height={600} />
        </>
    );
}

export default Schedule;