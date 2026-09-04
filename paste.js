export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (path === "/") {
      const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Paste</title>
<link rel="icon" href="https://nos.netease.com/ysf/d83520f7f7668d925b8c727172e937f9.png" type="image/png">
<script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js"></script>
<link id="prismCss" href="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-tomorrow.min.css" rel="stylesheet"/>
<style>
*{box-sizing:border-box;margin:0;padding:0;font-family:system-ui}
:root{
  --bg:#14171c;
  --card:#1e232b;
  --text:#e6edf3;
  --border:#2c313a;
  --hint-color:#8892a0;
}
.light{
  --bg:#ffffff;
  --card:#f3f4f6;
  --text:#1f2937;
  --border:#d1d5db;
  --hint-color:#6b7280;
}
body{background:var(--bg);color:var(--text);padding:16px;transition:0.3s}
.wrap{max-width:860px;margin:0 auto}
h1{margin-bottom:12px;font-size:22px;display:flex;justify-content:space-between;align-items:center}
textarea{width:100%;min-height:220px;background:var(--card);color:var(--text);border:1px solid var(--border);border-radius:8px;padding:12px;font-family:Consolas,monospace;font-size:14px;resize:vertical}
#dropWrap{position:relative}
#dropHint{position:absolute;inset:0;border:2px dashed #444c5a;border-radius:8px;display:flex;align-items:center;justify-content:center;color:var(--hint-color);pointer-events:none;opacity:0;transition:0.2s}
#dropWrap.dragover #dropHint{opacity:1;background:rgba(43,116,218,0.08)}
.bar{display:flex;gap:10px;margin:10px 0;flex-wrap:wrap;align-items:center}
input,select{background:var(--card);color:var(--text);border:1px solid var(--border);padding:7px 10px;border-radius:6px}
button{background:#2b74da;color:#fff;border:none;padding:8px 14px;border-radius:6px;cursor:pointer}
.box{background:var(--card);border-radius:10px;padding:14px;margin-bottom:10px}
pre[class*="language-"]{border-radius:8px;padding:12px;margin:0;overflow-x:auto}
.media-preview{max-width:100%;margin:8px 0;border-radius:8px}
.file-tip{font-size:13px;color:var(--hint-color);margin:6px 0}
.footer-note{text-align:center;margin-top:30px;font-size:13px;color:var(--hint-color)}
.hidden{display:none}
</style>
</head>
<body class="wrap">
  <h1>
  <span style="display:flex;align-items:center;gap:10px">
    <img src="https://nos.netease.com/ysf/d83520f7f7668d925b8c727172e937f9.png" alt="logo" style="height:32px;object-fit:contain;">
    <span>Paste</span>
  </span>
  <button id="themeBtn">切换浅色模式</button>
  </h1>
  <div id="editView" class="box">
    <div id="dropWrap">
      <div id="dropHint">松开鼠标上传图片/视频</div>
      <textarea id="ta" placeholder="粘贴文本，或将图片、视频拖拽到此框内…"></textarea>
    </div>
    <div class="file-tip">已选择：<span id="fileName">无</span></div>
    <div class="bar">
      <input type="file" id="fileInput" accept="image/*,video/mp4,video/webm">
      <select id="langSel">
        <option value="">纯文本</option>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="json">JSON</option>
        <option value="html">HTML</option>
        <option value="css">CSS</option>
        <option value="bash">Bash</option>
      </select>
      <select id="ttlSel">
        <option value="604800">7 天</option>
        <option value="2592000">30 天</option>
        <option value="0">永久</option>
      </select>
      <input id="pwdInp" placeholder="访问密码(选填)">
      <button id="submit">提交</button>
    </div>
  </div>

  <div id="passView" class="box hidden">
    <h3>此内容需要密码</h3>
    <div class="bar">
      <input id="passInput" placeholder="输入密码">
      <button id="unlockBtn">解锁</button>
    </div>
  </div>

  <div id="showView" class="box hidden">
    <div id="mediaArea"></div>
    <pre><code id="codeBlock"></code></pre>
    <div class="bar">
      <button id="copyBtn">复制内容</button>
      <button id="copyLinkBtn">复制分享链接</button>
      <button id="backBtn">返回</button>
    </div>
  </div>
  <div class="footer-note"><a href="#" target="_blank" style="color:var(--hint-color);text-decoration:none"><strong> @小小岚自用</strong></a><br/>
  <a href="https://m.tb.cn/h.8NH39z0?tk=edq0T57Yh0b " target="_blank" style="color:var(--hint-color);text-decoration:none"><img src="https://img.alicdn.com/tfs/TB19WObTNv1gK0jSZFFXXb0sXXa-144-144.png" style="height:16px;vertical-align:middle;margin-right:4px">
闲鱼小铺</a></div>

<script>
const $=s=>document.querySelector(s);
const editView=$("#editView");
const passView=$("#passView");
const showView=$("#showView");
const ta=$("#ta");
const dropWrap=$("#dropWrap");
const fileInput=$("#fileInput");
const fileName=$("#fileName");
const langSel=$("#langSel");
const ttlSel=$("#ttlSel");
const pwdInp=$("#pwdInp");
const codeBlock=$("#codeBlock");
const mediaArea=$("#mediaArea");
const themeBtn=$("#themeBtn");
const prismCss=$("#prismCss");

let currentId=null;
let selectedFile=null;
let isDark=true;

//主题切换
themeBtn.onclick=()=>{
  isDark=!isDark;
  document.body.classList.toggle("light",!isDark);
  if(isDark){
    themeBtn.innerText="切换浅色模式";
    prismCss.href="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-tomorrow.min.css";
  }else{
    themeBtn.innerText="切换深色模式";
    prismCss.href="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism.min.css";
  }
};

function setFile(f){
  selectedFile=f||null;
  fileName.innerText=selectedFile?selectedFile.name:"无";
}
fileInput.onchange=e=>setFile(e.target.files[0]);

//拖拽
dropWrap.addEventListener("dragover",e=>{e.preventDefault();dropWrap.classList.add("dragover");})
dropWrap.addEventListener("dragleave",()=>dropWrap.classList.remove("dragover"))
dropWrap.addEventListener("drop",e=>{
  e.preventDefault();
  dropWrap.classList.remove("dragover");
  const f=e.dataTransfer.files[0];
  if(f&&(f.type.startsWith("image/")||f.type.startsWith("video/"))){
    setFile(f);
  }
})

$("#submit").onclick=async()=>{
  const text=ta.value.trim();
  if(!text&&!selectedFile)return alert("请填写文字或选择图片/视频");
  const form=new FormData();
  form.append("text",text);
  form.append("lang",langSel.value);
  form.append("ttl",Number(ttlSel.value));
  form.append("pass",pwdInp.value.trim());
  if(selectedFile) form.append("file",selectedFile);

  const res=await fetch("/api/new",{method:"POST",body:form});
  const id=await res.text();
  window.location.hash=id;
  loadId(id);
};

$("#backBtn").onclick=()=>{
  editView.classList.remove("hidden");
  passView.classList.add("hidden");
  showView.classList.add("hidden");
  window.location.hash="";
  currentId=null;
  mediaArea.innerHTML="";
  setFile(null);
  ta.value="";
};

$("#copyBtn").onclick=async()=>{
  await navigator.clipboard.writeText(codeBlock.innerText);
  alert("已复制内容");
};

$("#copyLinkBtn").onclick=async()=>{
  await navigator.clipboard.writeText(location.href);
  alert("分享链接已复制");
};

$("#unlockBtn").onclick=async()=>{
  const pass=$("#passInput").value;
  const r=await fetch("/api/get/"+currentId,{headers:{"X-Pass":pass}});
  if(!r.ok)return alert("密码错误或不存在");
  const data=await r.json();
  renderContent(data);
};

function renderContent(data){
  editView.classList.add("hidden");
  passView.classList.add("hidden");
  showView.classList.remove("hidden");
  codeBlock.className=data.lang?"language-"+data.lang:"language-plaintext";
  codeBlock.textContent=data.text;
  Prism.highlightElement(codeBlock);
  mediaArea.innerHTML="";
  if(data.mediaUrl){
    if(data.mediaType.startsWith("image/")){
      const img=document.createElement("img");
      img.src=data.mediaUrl;
      img.className="media-preview";
      mediaArea.appendChild(img);
    }else if(data.mediaType.startsWith("video/")){
      const vid=document.createElement("video");
      vid.src=data.mediaUrl;
      vid.controls=true;
      vid.className="media-preview";
      mediaArea.appendChild(vid);
    }
  }
}

async function loadId(id){
  currentId=id;
  const r=await fetch("/api/get/"+id);
  if(r.status===403){
    editView.classList.add("hidden");
    passView.classList.remove("hidden");
    showView.classList.add("hidden");
    return;
  }
  if(!r.ok)return alert("不存在或已过期");
  const data=await r.json();
  renderContent(data);
}

window.addEventListener("hashchange",()=>{
  const h=location.hash.slice(1);
  if(h) loadId(h);
});
const initHash=location.hash.slice(1);
if(initHash) loadId(initHash);
</script>
</body>
</html>`;
      return new Response(html, { headers: { "content-type": "text/html;charset=utf-8" } });
    }

    if(path.startsWith("/api/file/")){
      const fid=path.slice("/api/file/".length);
      const obj=await env.PASTE_R2.get(fid);
      if(!obj) return new Response("404",{status:404});
      return new Response(obj.body,{headers:{"content-type":obj.httpMetadata.contentType}});
    }

    if (path.startsWith("/api/new")) {
      if (request.method !== "POST") return new Response("bad", { status: 400 });
      const form=await request.formData();
      const text=form.get("text")||"";
      const lang=form.get("lang")||"";
      const ttl=Number(form.get("ttl"));
      const pass=form.get("pass")||"";
      const file=form.get("file");

      const id = Math.random().toString(36).slice(2, 10);
      let mediaUrl="",mediaType="";
      if(file&&file.size>0){
        const fid=id+"-"+Date.now();
        await env.PASTE_R2.put(fid,file,{httpMetadata:{contentType:file.type}});
        mediaUrl="/api/file/"+fid;
        mediaType=file.type;
      }

      const store = JSON.stringify({ text, lang, pass, mediaUrl, mediaType });
      const opt = {};
      const sec = Number(ttl);
      if (sec > 0) opt.expirationTtl = sec;
      await env.PASTE_KV.put(id, store, opt);
      return new Response(id);
    }

    const m = path.match(/^\/api\/get\/([a-z0-9]+)$/);
    if (m) {
      const id = m[1];
      const raw = await env.PASTE_KV.get(id);
      if (!raw) return new Response("not found", { status: 404 });
      const obj = JSON.parse(raw);
      const userPass = request.headers.get("X-Pass") || "";
      if(obj.pass && userPass !== obj.pass){
        return new Response("need password",{status:403});
      }
      return new Response(JSON.stringify(obj),{
        headers:{"content-type":"application/json;charset=utf-8"}
      });
    }
    return new Response("404", { status: 404 });
  }
};
