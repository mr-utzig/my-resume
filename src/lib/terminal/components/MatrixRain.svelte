<script lang="ts">
    import { onMount } from "svelte";
    
    export let fullscreen: boolean = false;
    
    let canvas: HTMLCanvasElement;
    
    onMount(() => {
        if (!canvas) return;
        
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        
        function resize() {
            if (fullscreen) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            } else {
                canvas.width = canvas.parentElement?.clientWidth || 800;
                canvas.height = canvas.parentElement?.clientHeight || 600;
            }
        }
        
        resize();
        
        const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>{}[]();:=+-*/";
        const charArray = chars.split("");
        const fontSize = 14;
        let columns = Math.floor(canvas.width / fontSize);
        let drops: number[] = [];
        
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * -100;
        }
        
        function draw() {
            if (!ctx) return;
            
            // Clear with semi-transparent background for fade effect
            ctx.fillStyle = fullscreen ? "rgba(26, 27, 38, 0.15)" : "rgba(26, 27, 38, 0.25)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.font = `${fontSize}px monospace`;
            
            for (let i = 0; i < drops.length; i++) {
                const text = charArray[Math.floor(Math.random() * charArray.length)];
                const x = i * fontSize;
                const y = drops[i] * fontSize;
                
                if (fullscreen) {
                    // Bright green for fullscreen matrix
                    ctx.fillStyle = "#00ff41";
                } else {
                    // Subtle green for background
                    ctx.fillStyle = "#00ff4130";
                }
                
                ctx.fillText(text, x, y);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        
        const interval = setInterval(draw, fullscreen ? 33 : 50);
        
        window.addEventListener("resize", () => {
            resize();
            columns = Math.floor(canvas.width / fontSize);
            drops = [];
            for (let i = 0; i < columns; i++) {
                drops[i] = Math.random() * -100;
            }
        });
        
        return () => clearInterval(interval);
    });
</script>

<canvas 
    bind:this={canvas} 
    class="matrix-canvas"
    class:fullscreen
></canvas>

<style>
    .matrix-canvas {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
        pointer-events: none;
    }
    
    .matrix-canvas.fullscreen {
        position: fixed;
        z-index: 9999;
        pointer-events: all;
    }
</style>
