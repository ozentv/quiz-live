import json, sys, os, subprocess
base = sys.argv[1]; d = json.load(open(base + '.json')); f = d['frames']
start = d['preEnd'] / 1000 - 0.05 if d['preEnd'] else f[0]
idx = [i for i, t in enumerate(f) if t >= start]; i0 = max(0, idx[0] - 1)
lines = []
for i in range(i0, len(f)):
    dur = (f[i + 1] - f[i]) if i + 1 < len(f) else 1.5
    lines.append("file '%s/f%05d.jpg'\nduration %.4f" % (os.path.abspath(base + '_frames'), i, dur))
lines.append("file '%s/f%05d.jpg'" % (os.path.abspath(base + '_frames'), len(f) - 1))
open(base + '_list.txt', 'w').write("\n".join(lines))
astart = f[i0] - d['recT'] / 1000
subprocess.run(['ffmpeg', '-nostdin', '-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', base + '_list.txt', '-ss', '%.3f' % max(0, astart), '-i', base + '.webm',
  '-vf', 'fps=30,format=yuv420p', '-c:v', 'libx264', '-preset', 'medium', '-crf', '20', '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', sys.argv[2]], check=True)
print('ok', sys.argv[2], 'début coupé à', round(start - f[0], 1), 's')
