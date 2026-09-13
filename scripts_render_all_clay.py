import bpy
import os
import sys

def setup_and_render(output_path):
    scene = bpy.context.scene
    
    # Ensure all objects in the scene are visible in render
    for obj in scene.objects:
        # Keep grease pencil or reference empties hidden if they shouldn't render
        if obj.type in ['EMPTY', 'LIGHT', 'CAMERA']:
            continue
        obj.hide_render = False

    # Create high-end Clay Studio Material
    clay_mat = bpy.data.materials.new(name="Clay_Studio_Material")
    clay_mat.use_nodes = True
    nodes = clay_mat.node_tree.nodes
    bsdf = nodes.get("Principled BSDF")
    
    if bsdf:
        # Neutral soft grey clay
        bsdf.inputs["Base Color"].default_value = (0.75, 0.75, 0.78, 1.0)
        bsdf.inputs["Roughness"].default_value = 0.38
        bsdf.inputs["IOR"].default_value = 1.45
        if "Specular IOR Level" in bsdf.inputs:
            bsdf.inputs["Specular IOR Level"].default_value = 0.5
        elif "Specular" in bsdf.inputs:
            bsdf.inputs["Specular"].default_value = 0.5

    # Apply material override on view layer
    for vl in scene.view_layers:
        vl.material_override = clay_mat

    # Set 1920x1080 resolution (16:9 aspect ratio matching original renders)
    scene.render.resolution_x = 1920
    scene.render.resolution_y = 1080
    scene.render.resolution_percentage = 100
    scene.render.image_settings.file_format = 'PNG'
    scene.render.image_settings.color_mode = 'RGBA'
    scene.render.filepath = os.path.abspath(output_path)

    # Use Cycles for ultra soft realistic shadows and ambient occlusion
    scene.render.engine = 'CYCLES'
    if hasattr(scene, 'cycles'):
        scene.cycles.samples = 64
        scene.cycles.use_denoising = True

    print(f"Rendering clay to {output_path}...")
    bpy.ops.render.render(write_still=True)
    print(f"Done rendering: {output_path}")

if __name__ == '__main__':
    # Argument 1: output file
    args = sys.argv
    if '--' in args:
        custom_args = args[args.index('--') + 1:]
        out = custom_args[0]
    else:
        out = "assets/renders/output_clay.png"
    setup_and_render(out)
