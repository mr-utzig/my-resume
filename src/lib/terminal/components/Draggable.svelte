<script lang="ts">
    let draggable: HTMLElement;
    let header: HTMLElement;
    let pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;

    $: if (draggable && header) {
        if (header) {
            // if present, the header is where you move the DIV from:
            header.onmousedown = dragMouseDown;
        } else {
            // otherwise, move the DIV from anywhere inside the DIV:
            draggable.onmousedown = dragMouseDown;
        }
    }

    function dragMouseDown(e: DragEvent) {
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e: DragEvent) {
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        draggable.style.top = draggable.offsetTop - pos2 + "px";
        draggable.style.left = draggable.offsetLeft - pos1 + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
</script>

<div class="draggable" bind:this={draggable}>
    <div class="header" bind:this={header}>drag here</div>
    <slot />
</div>

<style>
    .draggable {
        position: absolute;
        z-index: 9;
        background-color: #f1f1f1;
        border: 1px solid #d3d3d3;
        text-align: center;
    }

    .header {
        padding: 10px;
        cursor: move;
        z-index: 10;
        background-color: #2196f3;
        color: #fff;
    }
</style>
