import { fabric } from 'fabric';

/**
 * SVG Path definitions for authentic festive Diwali elements
 */
export const FESTIVE_SVGS = {
  diya: `M 50 15 C 53 10 57 6 50 0 C 43 6 47 10 50 15 Z M 20 22 C 20 22 25 38 50 38 C 75 38 80 22 80 22 C 70 26 58 28 50 28 C 42 28 30 26 20 22 Z M 30 38 C 30 42 40 45 50 45 C 60 45 70 42 70 38 Z`,
  mandala: `M 50 0 L 58 35 L 90 20 L 70 48 L 100 50 L 70 52 L 90 80 L 58 65 L 50 100 L 42 65 L 10 80 L 30 52 L 0 50 L 30 48 L 10 20 L 42 35 Z`,
  sparkler: `M 50 5 L 53 38 L 85 20 L 60 45 L 95 50 L 60 55 L 85 80 L 53 62 L 50 95 L 47 62 L 15 80 L 40 55 L 5 50 L 40 45 L 15 20 L 47 38 Z`,
  lantern: `M 40 5 L 60 5 L 65 15 L 75 40 L 65 65 L 55 75 L 45 75 L 35 65 L 25 40 L 35 15 Z M 48 75 L 48 95 M 52 75 L 52 95 M 50 75 L 50 98`,
  badge: `M 0 0 L 120 0 L 105 30 L 120 60 L 0 60 L 15 30 Z`
};

export const canvasUtils = {
  /**
   * Initialize a Fabric.js canvas
   */
  initCanvas(canvasEl, options = {}) {
    const { width = 1080, height = 1080 } = options;

    const canvas = new fabric.Canvas(canvasEl, {
      width,
      height,
      backgroundColor: '#080A12',
      preserveObjectStacking: true,
      selectionColor: 'rgba(245, 185, 66, 0.15)',
      selectionBorderColor: '#F5B942',
      selectionLineWidth: 1.5,
      selectionDashArray: [4, 4]
    });

    // Custom styling for object transformation controls
    fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.cornerColor = '#F5B942';
    fabric.Object.prototype.cornerStrokeColor = '#FFFFFF';
    fabric.Object.prototype.borderColor = '#F5B942';
    fabric.Object.prototype.cornerSize = 10;
    fabric.Object.prototype.cornerStyle = 'circle';
    fabric.Object.prototype.borderDashArray = [4, 4];

    return canvas;
  },

  /**
   * Load JSON or template objects into canvas
   */
  loadTemplateData(canvas, templateData, onComplete) {
    if (!canvas || !templateData) return;

    if (templateData.width && templateData.height) {
      canvas.setWidth(templateData.width);
      canvas.setHeight(templateData.height);
    }

    if (templateData.canvasData) {
      canvas.loadFromJSON(templateData.canvasData, () => {
        canvas.renderAll();
        if (onComplete) onComplete();
      });
    } else {
      canvas.renderAll();
      if (onComplete) onComplete();
    }
  },

  /**
   * Add text element
   */
  addText(canvas, text = 'Diwali Dhamaka Offer', options = {}) {
    if (!canvas) return null;

    const {
      fontFamily = 'Outfit',
      fontSize = 36,
      fill = '#FFFFFF',
      fontWeight = '600',
      textAlign = 'center'
    } = options;

    const center = canvas.getCenter();

    const textbox = new fabric.Textbox(text, {
      left: center.left,
      top: center.top,
      originX: 'center',
      originY: 'center',
      width: Math.min(canvas.width - 100, 500),
      fontFamily,
      fontSize,
      fill,
      fontWeight,
      textAlign,
      shadow: new fabric.Shadow({
        color: 'rgba(0, 0, 0, 0.5)',
        blur: 10,
        offsetX: 0,
        offsetY: 2
      })
    });

    canvas.add(textbox);
    canvas.setActiveObject(textbox);
    canvas.renderAll();
    return textbox;
  },

  /**
   * Add image (from URL or upload)
   */
  addImage(canvas, imageUrl, options = {}) {
    if (!canvas || !imageUrl) return;

    fabric.Image.fromURL(imageUrl, (img) => {
      if (!img) return;

      const center = canvas.getCenter();
      
      // Auto-scale image to reasonable size if very large
      const maxDim = Math.min(canvas.width * 0.45, canvas.height * 0.45);
      if (img.width > maxDim || img.height > maxDim) {
        const scale = maxDim / Math.max(img.width, img.height);
        img.scale(scale);
      }

      img.set({
        left: center.left,
        top: center.top,
        originX: 'center',
        originY: 'center',
        cornerSize: 10,
        ...options
      });

      canvas.add(img);
      canvas.setActiveObject(img);
      canvas.renderAll();
    }, { crossOrigin: 'anonymous' });
  },

  /**
   * Add Festive decorative shape (Diya, Mandala, Sparkler, Lantern, Ribbon)
   */
  addFestiveElement(canvas, type = 'diya', options = {}) {
    if (!canvas) return;
    const center = canvas.getCenter();

    if (type === 'diya') {
      const path = new fabric.Path(FESTIVE_SVGS.diya, {
        left: center.left,
        top: center.top,
        originX: 'center',
        originY: 'center',
        scaleX: 2.2,
        scaleY: 2.2,
        fill: options.fill || '#F5B942',
        stroke: options.stroke || '#FF7043',
        strokeWidth: 1,
        shadow: new fabric.Shadow({
          color: 'rgba(245, 185, 66, 0.6)',
          blur: 25,
          offsetX: 0,
          offsetY: 0
        })
      });
      canvas.add(path);
      canvas.setActiveObject(path);
    } else if (type === 'mandala') {
      const path = new fabric.Path(FESTIVE_SVGS.mandala, {
        left: center.left,
        top: center.top,
        originX: 'center',
        originY: 'center',
        scaleX: 1.8,
        scaleY: 1.8,
        fill: 'rgba(245, 185, 66, 0.2)',
        stroke: options.stroke || '#F5B942',
        strokeWidth: 1.5,
        shadow: new fabric.Shadow({
          color: 'rgba(245, 185, 66, 0.3)',
          blur: 15,
          offsetX: 0,
          offsetY: 0
        })
      });
      canvas.add(path);
      canvas.setActiveObject(path);
    } else if (type === 'sparkler') {
      const path = new fabric.Path(FESTIVE_SVGS.sparkler, {
        left: center.left,
        top: center.top,
        originX: 'center',
        originY: 'center',
        scaleX: 1.5,
        scaleY: 1.5,
        fill: options.fill || '#FFF176',
        stroke: '#F59E0B',
        strokeWidth: 1,
        shadow: new fabric.Shadow({
          color: 'rgba(255, 241, 118, 0.8)',
          blur: 20,
          offsetX: 0,
          offsetY: 0
        })
      });
      canvas.add(path);
      canvas.setActiveObject(path);
    } else if (type === 'lantern') {
      const path = new fabric.Path(FESTIVE_SVGS.lantern, {
        left: center.left,
        top: center.top,
        originX: 'center',
        originY: 'center',
        scaleX: 1.6,
        scaleY: 1.6,
        fill: 'rgba(255, 112, 67, 0.25)',
        stroke: '#FF7043',
        strokeWidth: 2
      });
      canvas.add(path);
      canvas.setActiveObject(path);
    } else if (type === 'badge') {
      const rect = new fabric.Rect({
        left: center.left,
        top: center.top,
        originX: 'center',
        originY: 'center',
        width: 260,
        height: 60,
        rx: 30,
        ry: 30,
        fill: options.fill || '#E11D48',
        stroke: '#FFD700',
        strokeWidth: 2,
        shadow: new fabric.Shadow({
          color: 'rgba(225, 29, 72, 0.4)',
          blur: 15,
          offsetX: 0,
          offsetY: 0
        })
      });
      canvas.add(rect);
      canvas.setActiveObject(rect);
    } else if (type === 'circle') {
      const circle = new fabric.Circle({
        left: center.left,
        top: center.top,
        originX: 'center',
        originY: 'center',
        radius: 80,
        fill: 'transparent',
        stroke: options.stroke || '#F5B942',
        strokeWidth: 3
      });
      canvas.add(circle);
      canvas.setActiveObject(circle);
    } else if (type === 'golden-frame') {
      const frame = new fabric.Rect({
        left: center.left,
        top: center.top,
        originX: 'center',
        originY: 'center',
        width: 320,
        height: 320,
        rx: 16,
        ry: 16,
        fill: 'rgba(255, 255, 255, 0.04)',
        stroke: '#F5B942',
        strokeWidth: 2,
        strokeDashArray: [6, 4]
      });
      canvas.add(frame);
      canvas.setActiveObject(frame);
    }

    canvas.renderAll();
  },

  /**
   * Duplicate active object
   */
  duplicateActiveObject(canvas) {
    if (!canvas) return;
    const active = canvas.getActiveObject();
    if (!active) return;

    active.clone((cloned) => {
      canvas.discardActiveObject();
      cloned.set({
        left: active.left + 25,
        top: active.top + 25,
        evented: true
      });
      if (cloned.type === 'activeSelection') {
        cloned.canvas = canvas;
        cloned.forEachObject((obj) => {
          canvas.add(obj);
        });
        cloned.setCoords();
      } else {
        canvas.add(cloned);
      }
      canvas.setActiveObject(cloned);
      canvas.requestRenderAll();
    });
  },

  /**
   * Delete active object
   */
  deleteActiveObject(canvas) {
    if (!canvas) return;
    const active = canvas.getActiveObject();
    if (!active) return;

    if (active.type === 'activeSelection') {
      active.forEachObject((obj) => canvas.remove(obj));
    } else {
      canvas.remove(active);
    }
    canvas.discardActiveObject();
    canvas.requestRenderAll();
  },

  /**
   * Layering controls
   */
  bringForward(canvas) {
    const active = canvas?.getActiveObject();
    if (active) {
      canvas.bringForward(active);
      canvas.renderAll();
    }
  },

  sendBackward(canvas) {
    const active = canvas?.getActiveObject();
    if (active) {
      canvas.sendBackwards(active);
      canvas.renderAll();
    }
  },

  bringToFront(canvas) {
    const active = canvas?.getActiveObject();
    if (active) {
      canvas.bringToFront(active);
      canvas.renderAll();
    }
  },

  sendToBack(canvas) {
    const active = canvas?.getActiveObject();
    if (active) {
      // Keep background rect at absolute bottom
      canvas.sendToBack(active);
      const bg = canvas.getObjects().find(o => o.id === 'bg-rect');
      if (bg) {
        canvas.sendToBack(bg);
      }
      canvas.renderAll();
    }
  },

  /**
   * Toggle lock on active object
   */
  toggleLock(canvas) {
    const active = canvas?.getActiveObject();
    if (!active) return false;

    const isLocked = !active.lockMovementX;
    active.set({
      lockMovementX: isLocked,
      lockMovementY: isLocked,
      lockRotation: isLocked,
      lockScalingX: isLocked,
      lockScalingY: isLocked,
      hasControls: !isLocked
    });

    canvas.renderAll();
    return isLocked;
  },

  /**
   * Proportional auto-refit of all canvas objects when changing format dimensions
   */
  resizeAndRefit(canvas, oldWidth, oldHeight, newWidth, newHeight) {
    if (!canvas || !oldWidth || !oldHeight || !newWidth || !newHeight) return;
    if (oldWidth === newWidth && oldHeight === newHeight) return;

    const scaleX = newWidth / oldWidth;
    const scaleY = newHeight / oldHeight;

    canvas.setWidth(newWidth);
    canvas.setHeight(newHeight);

    const objects = canvas.getObjects();
    objects.forEach((obj) => {
      if (obj.id === 'bg-rect') {
        obj.set({
          left: 0,
          top: 0,
          width: newWidth,
          height: newHeight
        });
      } else if (obj.id === 'frame-outer') {
        const pad = 36;
        const frameTop = newHeight > 1500 ? 140 : pad;
        const frameHeight = newHeight > 1500 ? (newHeight - 280) : (newHeight - pad * 2);
        obj.set({
          left: pad,
          top: frameTop,
          width: newWidth - pad * 2,
          height: frameHeight
        });
      } else if (obj.id === 'frame-inner') {
        const pad = 48;
        const frameTop = newHeight > 1500 ? 152 : pad;
        const frameHeight = newHeight > 1500 ? (newHeight - 304) : (newHeight - pad * 2);
        obj.set({
          left: pad,
          top: frameTop,
          width: newWidth - pad * 2,
          height: frameHeight
        });
      } else {
        // Proportionally scale position
        const newLeft = obj.left * scaleX;
        const newTop = obj.top * scaleY;
        obj.set({
          left: newLeft,
          top: newTop
        });

        // Ensure object stays within boundaries
        obj.setCoords();
      }
    });

    canvas.renderAll();
  },

  /**
   * Export canvas to high-res data URL
   */
  exportToDataURL(canvas, format = 'png', multiplier = 1) {
    if (!canvas) return null;
    return canvas.toDataURL({
      format: format === 'jpeg' ? 'jpeg' : 'png',
      multiplier,
      quality: 0.95
    });
  }
};
