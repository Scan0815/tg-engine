# Examples

This section provides practical examples of using TG Engine in different scenarios.

## Basic Examples

### Simple Sprite Display
```html
<tg-sprite 
    src="player.png"
    width="32"
    height="32"
    hFrames="1"
    vFrames="1">
</tg-sprite>
```

### Animated Character
```html
<tg-sprite-animator 
    animations='{
        "idle": {"frames": [0,1,2,3], "duration": 100},
        "walk": {"frames": [4,5,6,7], "duration": 80}
    }'
    play="idle">
    <tg-sprite 
        src="player.png"
        width="32"
        height="32"
        hFrames="8"
        vFrames="1">
    </tg-sprite>
</tg-sprite-animator>
```

### Tile Map
```html
<tg-sprite-map
    src="tiles.png"
    width="32"
    height="32"
    hFrames="8"
    vFrames="8"
    tiles='[
        {"x": 0, "y": 0, "frame": 0},
        {"x": 1, "y": 0, "frame": 1}
    ]'>
</tg-sprite-map>
```

## Game Examples

### Platformer Character
```html
<tg-sprite-animator 
    id="player"
    animations='{
        "idle": {"frames": [0,1,2,3], "duration": 100},
        "walk": {"frames": [4,5,6,7], "duration": 80},
        "jump": {"frames": [8,9,10], "duration": 60}
    }'
    play="idle">
    <tg-sprite 
        src="player.png"
        width="32"
        height="32"
        hFrames="11"
        vFrames="1">
    </tg-sprite>
    <tg-collider
        type="box"
        width="32"
        height="32">
    </tg-collider>
</tg-sprite-animator>

<tg-camera
    target="player"
    mode="lerp"
    lerpSpeed="0.1">
</tg-camera>

<script>
    const player = document.getElementById('player');
    const keys = {};
    
    // Handle input
    window.addEventListener('keydown', (e) => keys[e.key] = true);
    window.addEventListener('keyup', (e) => keys[e.key] = false);
    
    // Game loop
    function update() {
        if (keys['ArrowLeft']) {
            player.play = 'walk';
            // Move left
        } else if (keys['ArrowRight']) {
            player.play = 'walk';
            // Move right
        } else {
            player.play = 'idle';
        }
        
        if (keys['Space']) {
            player.play = 'jump';
            // Jump
        }
        
        requestAnimationFrame(update);
    }
    
    update();
</script>
```

### Top-Down RPG
```html
<tg-sprite-map
    id="world"
    src="world.png"
    width="32"
    height="32"
    hFrames="8"
    vFrames="8"
    tiles='[
        {"x": 0, "y": 0, "frame": 0},
        {"x": 1, "y": 0, "frame": 1}
    ]'>
</tg-sprite-map>

<tg-sprite-animator 
    id="player"
    animations='{
        "idle": {"frames": [0,1,2,3], "duration": 100},
        "walk": {"frames": [4,5,6,7], "duration": 80}
    }'
    play="idle">
    <tg-sprite 
        src="player.png"
        width="32"
        height="32"
        hFrames="8"
        vFrames="1">
    </tg-sprite>
    <tg-collider
        type="circle"
        radius="16">
    </tg-collider>
</tg-sprite-animator>

<tg-camera
    target="player"
    mode="follow"
    deadzone='{"x": 100, "y": 100, "width": 200, "height": 200}'>
</tg-camera>

<script>
    const player = document.getElementById('player');
    const world = document.getElementById('world');
    const keys = {};
    
    // Handle input
    window.addEventListener('keydown', (e) => keys[e.key] = true);
    window.addEventListener('keyup', (e) => keys[e.key] = false);
    
    // Game loop
    function update() {
        if (keys['ArrowLeft']) {
            player.play = 'walk';
            // Move left
        } else if (keys['ArrowRight']) {
            player.play = 'walk';
            // Move right
        } else if (keys['ArrowUp']) {
            player.play = 'walk';
            // Move up
        } else if (keys['ArrowDown']) {
            player.play = 'walk';
            // Move down
        } else {
            player.play = 'idle';
        }
        
        requestAnimationFrame(update);
    }
    
    update();
</script>
```

### Puzzle Game
```html
<tg-sprite-map
    id="board"
    src="tiles.png"
    width="64"
    height="64"
    hFrames="4"
    vFrames="4"
    tiles='[
        {"x": 0, "y": 0, "frame": 0},
        {"x": 1, "y": 0, "frame": 1},
        {"x": 2, "y": 0, "frame": 2}
    ]'>
</tg-sprite-map>

<script>
    const board = document.getElementById('board');
    
    // Handle tile clicks
    board.addEventListener('tileClick', (event) => {
        const { x, y } = event.detail;
        // Handle tile selection
    });
    
    // Update board
    function updateBoard(newTiles) {
        board.setTiles(newTiles);
    }
</script>
```

## Advanced Examples

### Particle System
```html
<tg-sprite-animator 
    id="particle"
    animations='{
        "fade": {"frames": [0,1,2,3], "duration": 50}
    }'
    play="fade">
    <tg-sprite 
        src="particle.png"
        width="8"
        height="8"
        hFrames="4"
        vFrames="1">
    </tg-sprite>
</tg-sprite-animator>

<script>
    class ParticleSystem {
        constructor() {
            this.particles = [];
        }
        
        emit(x, y) {
            const particle = document.createElement('tg-sprite-animator');
            // Configure particle
            this.particles.push(particle);
        }
        
        update() {
            this.particles.forEach(particle => {
                // Update particle position
            });
        }
    }
</script>
```

### Cutscene System
```html
<tg-sprite-animator 
    id="cutscene"
    animations='{
        "scene1": {"frames": [0,1,2,3], "duration": 200},
        "scene2": {"frames": [4,5,6,7], "duration": 200}
    }'
    play="scene1">
    <tg-sprite 
        src="cutscene.png"
        width="800"
        height="600"
        hFrames="8"
        vFrames="1">
    </tg-sprite>
</tg-sprite-animator>

<script>
    const cutscene = document.getElementById('cutscene');
    
    cutscene.addEventListener('animationEnd', (event) => {
        if (event.detail.name === 'scene1') {
            cutscene.play = 'scene2';
        }
    });
</script>
```

### Inventory System
```html
<tg-sprite-map
    id="inventory"
    src="items.png"
    width="32"
    height="32"
    hFrames="8"
    vFrames="8"
    tiles='[
        {"x": 0, "y": 0, "frame": 0},
        {"x": 1, "y": 0, "frame": 1}
    ]'>
</tg-sprite-map>

<script>
    const inventory = document.getElementById('inventory');
    
    class InventorySystem {
        constructor() {
            this.items = [];
        }
        
        addItem(item) {
            this.items.push(item);
            this.updateDisplay();
        }
        
        updateDisplay() {
            inventory.setTiles(this.items);
        }
    }
</script>
```

## Best Practices

1. **Component Organization**
   - Keep components modular and reusable
   - Use appropriate component nesting
   - Implement proper event handling

2. **Performance**
   - Use appropriate sprite sizes
   - Implement proper culling
   - Optimize animation frames

3. **Game Logic**
   - Separate game logic from rendering
   - Use proper state management
   - Implement efficient collision detection

4. **Asset Management**
   - Organize assets properly
   - Use appropriate sprite sheets
   - Optimize asset loading 