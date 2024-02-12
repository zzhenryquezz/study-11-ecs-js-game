import{D as lt,u as W,a as ft,R as X,c as T,w as dt}from"./index-UtZmkIbQ.js";const $=Object.create(null),K=Object.create(null);function H(n,t){let e=K[n];return e===void 0&&($[t]===void 0&&($[t]=1),K[n]=e=$[t]++),e}let y;function mt(){return(!y||y!=null&&y.isContextLost())&&(y=lt.get().createCanvas().getContext("webgl",{})),y}let S;function pt(){if(!S){S="mediump";const n=mt();n&&n.getShaderPrecisionFormat&&(S=n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision?"highp":"mediump")}return S}function ht(n,t,e){return t?n:e?(n=n.replace("out vec4 finalColor;",""),`
        
        #ifdef GL_ES // This checks if it's WebGL1
        #define in varying
        #define finalColor gl_FragColor
        #define texture texture2D
        #endif
        ${n}
        `):`
        
        #ifdef GL_ES // This checks if it's WebGL1
        #define in attribute
        #define out varying
        #endif
        ${n}
        `}function gt(n,t,e){const r=e?t.maxSupportedFragmentPrecision:t.maxSupportedVertexPrecision;if(n.substring(0,9)!=="precision"){let o=e?t.requestedFragmentPrecision:t.requestedVertexPrecision;return o==="highp"&&r!=="highp"&&(o="mediump"),`precision ${o} float;
${n}`}else if(r!=="highp"&&n.substring(0,15)==="precision highp")return n.replace("precision highp","precision mediump");return n}function vt(n,t){return t?`#version 300 es
${n}`:n}const xt={},bt={};function Pt(n,{name:t="pixi-program"},e=!0){t=t.replace(/\s+/g,"-"),t+=e?"-fragment":"-vertex";const r=e?xt:bt;return r[t]?(r[t]++,t+=`-${r[t]}`):r[t]=1,n.indexOf("#define SHADER_NAME")!==-1?n:`${`#define SHADER_NAME ${t}`}
${n}`}function yt(n,t){return t?n.replace("#version 300 es",""):n}const A={stripVersion:yt,ensurePrecision:gt,addProgramDefines:ht,setProgramName:Pt,insertVersion:vt},U=Object.create(null),rt=class L{constructor(t){t={...L.defaultOptions,...t};const e=t.fragment.indexOf("#version 300 es")!==-1,r={stripVersion:e,ensurePrecision:{requestedFragmentPrecision:t.preferredFragmentPrecision,requestedVertexPrecision:t.preferredVertexPrecision,maxSupportedVertexPrecision:"highp",maxSupportedFragmentPrecision:pt()},setProgramName:{name:t.name},addProgramDefines:e,insertVersion:e};let o=t.fragment,s=t.vertex;Object.keys(A).forEach(a=>{const i=r[a];o=A[a](o,i,!0),s=A[a](s,i,!1)}),this.fragment=o,this.vertex=s,this._key=H(`${this.vertex}:${this.fragment}`,"gl-program")}destroy(){this.fragment=null,this.vertex=null,this._attributeData=null,this._uniformData=null,this._uniformBlockData=null,this.transformFeedbackVaryings=null}static from(t){const e=`${t.vertex}:${t.fragment}`;return U[e]||(U[e]=new L(t)),U[e]}};rt.defaultOptions={preferredVertexPrecision:"highp",preferredFragmentPrecision:"mediump"};let nt=rt;const q={uint8x2:{size:2,stride:2,normalised:!1},uint8x4:{size:4,stride:4,normalised:!1},sint8x2:{size:2,stride:2,normalised:!1},sint8x4:{size:4,stride:4,normalised:!1},unorm8x2:{size:2,stride:2,normalised:!0},unorm8x4:{size:4,stride:4,normalised:!0},snorm8x2:{size:2,stride:2,normalised:!0},snorm8x4:{size:4,stride:4,normalised:!0},uint16x2:{size:2,stride:4,normalised:!1},uint16x4:{size:4,stride:8,normalised:!1},sint16x2:{size:2,stride:4,normalised:!1},sint16x4:{size:4,stride:8,normalised:!1},unorm16x2:{size:2,stride:4,normalised:!0},unorm16x4:{size:4,stride:8,normalised:!0},snorm16x2:{size:2,stride:4,normalised:!0},snorm16x4:{size:4,stride:8,normalised:!0},float16x2:{size:2,stride:4,normalised:!1},float16x4:{size:4,stride:8,normalised:!1},float32:{size:1,stride:4,normalised:!1},float32x2:{size:2,stride:8,normalised:!1},float32x3:{size:3,stride:12,normalised:!1},float32x4:{size:4,stride:16,normalised:!1},uint32:{size:1,stride:4,normalised:!1},uint32x2:{size:2,stride:8,normalised:!1},uint32x3:{size:3,stride:12,normalised:!1},uint32x4:{size:4,stride:16,normalised:!1},sint32:{size:1,stride:4,normalised:!1},sint32x2:{size:2,stride:8,normalised:!1},sint32x3:{size:3,stride:12,normalised:!1},sint32x4:{size:4,stride:16,normalised:!1}};function Mt(n){return q[n]??q.float32}const Gt={f32:"float32","vec2<f32>":"float32x2","vec3<f32>":"float32x3","vec4<f32>":"float32x4",vec2f:"float32x2",vec3f:"float32x3",vec4f:"float32x4",i32:"sint32","vec2<i32>":"sint32x2","vec3<i32>":"sint32x3","vec4<i32>":"sint32x4",u32:"uint32","vec2<u32>":"uint32x2","vec3<u32>":"uint32x3","vec4<u32>":"uint32x4",bool:"uint32","vec2<bool>":"uint32x2","vec3<bool>":"uint32x3","vec4<bool>":"uint32x4"};function Ct({source:n,entryPoint:t}){const e={},r=n.indexOf(`fn ${t}`);if(r!==-1){const o=n.indexOf("->",r);if(o!==-1){const s=n.substring(r,o),a=/@location\((\d+)\)\s+([a-zA-Z0-9_]+)\s*:\s*([a-zA-Z0-9_<>]+)(?:,|\s|$)/g;let i;for(;(i=a.exec(s))!==null;){const c=Gt[i[3]]??"float32";e[i[2]]={location:parseInt(i[1],10),format:c,stride:Mt(c).stride,offset:0,instance:!1,start:0}}}}return e}function F(n){var f,m;const t=/(^|[^/])@(group|binding)\(\d+\)[^;]+;/g,e=/@group\((\d+)\)/,r=/@binding\((\d+)\)/,o=/var(<[^>]+>)? (\w+)/,s=/:\s*(\w+)/,a=/struct\s+(\w+)\s*{([^}]+)}/g,i=/(\w+)\s*:\s*([\w\<\>]+)/g,c=/struct\s+(\w+)/,l=(f=n.match(t))==null?void 0:f.map(d=>({group:parseInt(d.match(e)[1],10),binding:parseInt(d.match(r)[1],10),name:d.match(o)[2],isUniform:d.match(o)[1]==="<uniform>",type:d.match(s)[1]}));if(!l)return{groups:[],structs:[]};const u=((m=n.match(a))==null?void 0:m.map(d=>{const h=d.match(c)[1],v=d.match(i).reduce((x,b)=>{const[P,p]=b.split(":");return x[P.trim()]=p.trim(),x},{});return v?{name:h,members:v}:null}).filter(({name:d})=>l.some(h=>h.type===d)))??[];return{groups:l,structs:u}}var M=(n=>(n[n.VERTEX=1]="VERTEX",n[n.FRAGMENT=2]="FRAGMENT",n[n.COMPUTE=4]="COMPUTE",n))(M||{});function St({groups:n}){const t=[];for(let e=0;e<n.length;e++){const r=n[e];t[r.group]||(t[r.group]=[]),r.isUniform?t[r.group].push({binding:r.binding,visibility:M.VERTEX|M.FRAGMENT,buffer:{type:"uniform"}}):r.type==="sampler"?t[r.group].push({binding:r.binding,visibility:M.FRAGMENT,sampler:{type:"filtering"}}):r.type==="texture_2d"&&t[r.group].push({binding:r.binding,visibility:M.FRAGMENT,texture:{sampleType:"float",viewDimension:"2d",multisampled:!1}})}return t}function _t({groups:n}){const t=[];for(let e=0;e<n.length;e++){const r=n[e];t[r.group]||(t[r.group]={}),t[r.group][r.name]=r.binding}return t}function Tt(n,t){const e=new Set,r=new Set,o=[...n.structs,...t.structs].filter(a=>e.has(a.name)?!1:(e.add(a.name),!0)),s=[...n.groups,...t.groups].filter(a=>{const i=`${a.name}-${a.binding}`;return r.has(i)?!1:(r.add(i),!0)});return{structs:o,groups:s}}const E=Object.create(null);class _{constructor(t){var i,c;this._layoutKey=0;const{fragment:e,vertex:r,layout:o,gpuLayout:s,name:a}=t;if(this.name=a,this.fragment=e,this.vertex=r,e.source===r.source){const l=F(e.source);this.structsAndGroups=l}else{const l=F(r.source),u=F(e.source);this.structsAndGroups=Tt(l,u)}this.layout=o??_t(this.structsAndGroups),this.gpuLayout=s??St(this.structsAndGroups),this.autoAssignGlobalUniforms=((i=this.layout[0])==null?void 0:i.globalUniforms)!==void 0,this.autoAssignLocalUniforms=((c=this.layout[1])==null?void 0:c.localUniforms)!==void 0,this._generateProgramKey()}_generateProgramKey(){const{vertex:t,fragment:e}=this,r=t.source+e.source+t.entryPoint+e.entryPoint;this._layoutKey=H(r,"program")}get attributeData(){return this._attributeData??(this._attributeData=Ct(this.vertex)),this._attributeData}destroy(){this.gpuLayout=null,this.layout=null,this.structsAndGroups=null,this.fragment=null,this.vertex=null}static from(t){const e=`${t.vertex.source}:${t.fragment.source}:${t.fragment.entryPoint}:${t.vertex.entryPoint}`;return E[e]||(E[e]=new _(t)),E[e]}}function $t(n,t){switch(n){case"f32":return 0;case"vec2<f32>":return new Float32Array(2*t);case"vec3<f32>":return new Float32Array(3*t);case"vec4<f32>":return new Float32Array(4*t);case"mat2x2<f32>":return new Float32Array([1,0,0,1]);case"mat3x3<f32>":return new Float32Array([1,0,0,0,1,0,0,0,1]);case"mat4x4<f32>":return new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])}return null}const ot=class st{constructor(t,e){this._touched=0,this.uid=W("uniform"),this._resourceType="uniformGroup",this._resourceId=W("resource"),this.isUniformGroup=!0,this._dirtyId=0,e={...st.defaultOptions,...e},this.uniformStructures=t;const r={};for(const o in t){const s=t[o];s.name=o,s.size=s.size??1,s.value??(s.value=$t(s.type,s.size)),r[o]=s.value}this.uniforms=r,this._dirtyId=1,this.ubo=e.ubo,this.isStatic=e.isStatic,this._signature=H(Object.keys(r).map(o=>`${o}-${t[o].type}`).join("-"),"uniform-group")}update(){this._dirtyId++}};ot.defaultOptions={ubo:!1,isStatic:!1};let At=ot;class it extends ft{constructor(t){super(),this._uniformBindMap=Object.create(null),this._ownedBindGroups=[];let{gpuProgram:e,glProgram:r,groups:o,resources:s,compatibleRenderers:a,groupMap:i}=t;this.gpuProgram=e,this.glProgram=r,a===void 0&&(a=0,e&&(a|=X.WEBGPU),r&&(a|=X.WEBGL)),this.compatibleRenderers=a;const c={};if(!s&&!o&&(s={}),s&&o)throw new Error("[Shader] Cannot have both resources and groups");if(!e&&o&&!i)throw new Error("[Shader] No group map or WebGPU shader provided - consider using resources instead.");if(!e&&o&&i)for(const l in i)for(const u in i[l]){const f=i[l][u];c[f]={group:l,binding:u,name:f}}else if(e&&o&&!i){const l=e.structsAndGroups.groups;i={},l.forEach(u=>{i[u.group]=i[u.group]||{},i[u.group][u.binding]=u.name,c[u.name]=u})}else if(s){if(e){const l=e.structsAndGroups.groups;i={},l.forEach(u=>{i[u.group]=i[u.group]||{},i[u.group][u.binding]=u.name,c[u.name]=u})}else{i={},o={99:new T},this._ownedBindGroups.push(o[99]);let l=0;for(const u in s)c[u]={group:99,binding:l,name:u},i[99]=i[99]||{},i[99][l]=u,l++}o={};for(const l in s){const u=l;let f=s[l];!f.source&&!f._resourceType&&(f=new At(f));const m=c[u];m&&(o[m.group]||(o[m.group]=new T,this._ownedBindGroups.push(o[m.group])),o[m.group].setResource(f,m.binding))}}this.groups=o,this._uniformBindMap=i,this.resources=this._buildResourceAccessor(o,c)}addResource(t,e,r){var o,s;(o=this._uniformBindMap)[e]||(o[e]={}),(s=this._uniformBindMap[e])[r]||(s[r]=t),this.groups[e]||(this.groups[e]=new T,this._ownedBindGroups.push(this.groups[e]))}_buildResourceAccessor(t,e){const r={};for(const o in e){const s=e[o];Object.defineProperty(r,s.name,{get(){return t[s.group].getResource(s.binding)},set(a){t[s.group].setResource(a,s.binding)}})}return r}destroy(t=!1){var e,r;this.emit("destroy",this),t&&((e=this.gpuProgram)==null||e.destroy(),(r=this.glProgram)==null||r.destroy()),this.gpuProgram=null,this.glProgram=null,this.removeAllListeners(),this._uniformBindMap=null,this._ownedBindGroups.forEach(o=>{o.destroy()}),this._ownedBindGroups=null,this.resources=null,this.groups=null}static from(t){const{gpu:e,gl:r,...o}=t;let s,a;return e&&(s=_.from(e)),r&&(a=nt.from(r)),new it({gpuProgram:s,glProgram:a,...o})}}const Ut={normal:0,add:1,multiply:2,screen:3,overlay:4,erase:5,"normal-npm":6,"add-npm":7,"screen-npm":8},z=0,R=1,w=2,I=3,O=4,j=5,V=class at{constructor(){this.data=0,this.blendMode="normal",this.polygonOffset=0,this.blend=!0,this.depthMask=!0}get blend(){return!!(this.data&1<<z)}set blend(t){!!(this.data&1<<z)!==t&&(this.data^=1<<z)}get offsets(){return!!(this.data&1<<R)}set offsets(t){!!(this.data&1<<R)!==t&&(this.data^=1<<R)}set cullMode(t){if(t==="none"){this.culling=!1;return}this.culling=!0,this.clockwiseFrontFace=t==="front"}get cullMode(){return this.culling?this.clockwiseFrontFace?"front":"back":"none"}get culling(){return!!(this.data&1<<w)}set culling(t){!!(this.data&1<<w)!==t&&(this.data^=1<<w)}get depthTest(){return!!(this.data&1<<I)}set depthTest(t){!!(this.data&1<<I)!==t&&(this.data^=1<<I)}get depthMask(){return!!(this.data&1<<j)}set depthMask(t){!!(this.data&1<<j)!==t&&(this.data^=1<<j)}get clockwiseFrontFace(){return!!(this.data&1<<O)}set clockwiseFrontFace(t){!!(this.data&1<<O)!==t&&(this.data^=1<<O)}get blendMode(){return this._blendMode}set blendMode(t){this.blend=t!=="none",this._blendMode=t,this._blendModeId=Ut[t]||0}get polygonOffset(){return this._polygonOffset}set polygonOffset(t){this.offsets=!!t,this._polygonOffset=t}toString(){return`[pixi.js/core:State blendMode=${this.blendMode} clockwiseFrontFace=${this.clockwiseFrontFace} culling=${this.culling} depthMask=${this.depthMask} polygonOffset=${this.polygonOffset}]`}static for2d(){const t=new at;return t.depthTest=!1,t.blend=!0,t}};V.default2d=V.for2d();let qt=V;function Y(n,t,e){if(n)for(const r in n){const o=r.toLocaleLowerCase(),s=t[o];if(s){let a=n[r];r==="header"&&(a=a.replace(/@in\s+[^;]+;\s*/g,"").replace(/@out\s+[^;]+;\s*/g,"")),e&&s.push(`//----${e}----//`),s.push(a)}else dt(`${r} placement hook does not exist in shader`)}}const Ft=/\{\{(.*?)\}\}/g;function Z(n){var r;const t={};return(((r=n.match(Ft))==null?void 0:r.map(o=>o.replace(/[{()}]/g,"")))??[]).forEach(o=>{t[o]=[]}),t}function J(n,t){let e;const r=/@in\s+([^;]+);/g;for(;(e=r.exec(n))!==null;)t.push(e[1])}function Q(n,t,e=!1){const r=[];J(t,r),n.forEach(i=>{i.header&&J(i.header,r)});const o=r;e&&o.sort();const s=o.map((i,c)=>`       @location(${c}) ${i},`).join(`
`);let a=t.replace(/@in\s+[^;]+;\s*/g,"");return a=a.replace("{{in}}",`
${s}
`),a}function tt(n,t){let e;const r=/@out\s+([^;]+);/g;for(;(e=r.exec(n))!==null;)t.push(e[1])}function Et(n){const e=/\b(\w+)\s*:/g.exec(n);return e?e[1]:""}function zt(n){const t=/@.*?\s+/g;return n.replace(t,"")}function Rt(n,t){const e=[];tt(t,e),n.forEach(c=>{c.header&&tt(c.header,e)});let r=0;const o=e.sort().map(c=>c.indexOf("builtin")>-1?c:`@location(${r++}) ${c}`).join(`,
`),s=e.sort().map(c=>`       var ${zt(c)};`).join(`
`),a=`return VSOutput(
                ${e.sort().map(c=>` ${Et(c)}`).join(`,
`)});`;let i=t.replace(/@out\s+[^;]+;\s*/g,"");return i=i.replace("{{struct}}",`
${o}
`),i=i.replace("{{start}}",`
${s}
`),i=i.replace("{{return}}",`
${a}
`),i}function et(n,t){let e=n;for(const r in t){const o=t[r];o.join(`
`).length?e=e.replace(`{{${r}}}`,`//-----${r} START-----//
${o.join(`
`)}
//----${r} FINISH----//`):e=e.replace(`{{${r}}}`,"")}return e}const g=Object.create(null),D=new Map;let wt=0;function It({template:n,bits:t}){const e=ut(n,t);if(g[e])return g[e];const{vertex:r,fragment:o}=jt(n,t);return g[e]=ct(r,o,t),g[e]}function Ot({template:n,bits:t}){const e=ut(n,t);return g[e]||(g[e]=ct(n.vertex,n.fragment,t)),g[e]}function jt(n,t){const e=t.map(a=>a.vertex).filter(a=>!!a),r=t.map(a=>a.fragment).filter(a=>!!a);let o=Q(e,n.vertex,!0);o=Rt(e,o);const s=Q(r,n.fragment,!0);return{vertex:o,fragment:s}}function ut(n,t){return t.map(e=>(D.has(e)||D.set(e,wt++),D.get(e))).sort((e,r)=>e-r).join("-")+n.vertex+n.fragment}function ct(n,t,e){const r=Z(n),o=Z(t);return e.forEach(s=>{Y(s.vertex,r,s.name),Y(s.fragment,o,s.name)}),{vertex:et(n,r),fragment:et(t,o)}}const Dt=`
    @in aPosition: vec2<f32>;
    @in aUV: vec2<f32>;

    @out @builtin(position) vPosition: vec4<f32>;
    @out vUV : vec2<f32>;
    @out vColor : vec4<f32>;

    {{header}}

    struct VSOutput {
        {{struct}}
    };

    @vertex
    fn main( {{in}} ) -> VSOutput {

        var worldTransformMatrix = globalUniforms.uWorldTransformMatrix;
        var modelMatrix = mat3x3<f32>(
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0
          );
        var position = aPosition;

        {{start}}
        
        vColor = vec4<f32>(1., 1., 1., 1.);
        vUV = aUV;

        {{main}}

        var modelViewProjectionMatrix = globalUniforms.uProjectionMatrix * worldTransformMatrix * modelMatrix;

        vPosition =  vec4<f32>((modelViewProjectionMatrix *  vec3<f32>(position, 1.0)).xy, 0.0, 1.0);
       
        vColor *= globalUniforms.uWorldColorAlpha;

        {{end}}

        {{return}}
    };
`,Bt=`
    @in vUV : vec2<f32>;
    @in vColor : vec4<f32>;
   
    {{header}}

    @fragment
    fn main(
        {{in}}
      ) -> @location(0) vec4<f32> {
        
        {{start}}

        var outColor:vec4<f32>;
      
        {{main}}
        
        return outColor * vColor;
      };
`,kt=`
    in vec2 aPosition;
    in vec2 aUV;

    out vec4 vColor;
    out vec2 vUV;

    {{header}}

    void main(void){

        mat3 worldTransformMatrix = uWorldTransformMatrix;
        mat3 modelMatrix = mat3(
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0
          );
        vec2 position = aPosition;

        {{start}}
        
        vColor = vec4(1.);
        vUV = aUV;

        {{main}}

        mat3 modelViewProjectionMatrix = uProjectionMatrix * worldTransformMatrix * modelMatrix;

        gl_Position = vec4((modelViewProjectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);

        vColor *= uWorldColorAlpha;

        {{end}}
    }
`,Nt=`
   
    in vec4 vColor;
    in vec2 vUV;

    out vec4 finalColor;

    {{header}}

    void main(void) {
        
        {{start}}

        vec4 outColor;
      
        {{main}}
        
        finalColor = outColor * vColor;
    }
`,Lt={name:"global-uniforms-bit",vertex:{header:`
        struct GlobalUniforms {
            uProjectionMatrix:mat3x3<f32>,
            uWorldTransformMatrix:mat3x3<f32>,
            uWorldColorAlpha: vec4<f32>,
            uResolution: vec2<f32>,
        }

        @group(0) @binding(0) var<uniform> globalUniforms : GlobalUniforms;
        `}},Vt={name:"global-uniforms-bit",vertex:{header:`
          uniform mat3 uProjectionMatrix;
          uniform mat3 uWorldTransformMatrix;
          uniform vec4 uWorldColorAlpha;
          uniform vec2 uResolution;
        `}};function Yt({bits:n,name:t}){const e=It({template:{fragment:Bt,vertex:Dt},bits:[Lt,...n]});return _.from({name:t,vertex:{source:e.vertex,entryPoint:"main"},fragment:{source:e.fragment,entryPoint:"main"}})}function Zt({bits:n,name:t}){return new nt({name:t,...Ot({template:{vertex:kt,fragment:Nt},bits:[Vt,...n]})})}const Jt={name:"color-bit",vertex:{header:`
            @in aColor: vec4<f32>;
        `,main:`
            vColor *= vec4<f32>(aColor.rgb * aColor.a, aColor.a);
        `}},Qt={name:"color-bit",vertex:{header:`
            in vec4 aColor;
        `,main:`
            vColor *= vec4(aColor.rgb * aColor.a, aColor.a);
        `}},B={};function Ht(n){const t=[];if(n===1)t.push("@group(1) @binding(0) var textureSource1: texture_2d<f32>;"),t.push("@group(1) @binding(1) var textureSampler1: sampler;");else{let e=0;for(let r=0;r<n;r++)t.push(`@group(1) @binding(${e++}) var textureSource${r+1}: texture_2d<f32>;`),t.push(`@group(1) @binding(${e++}) var textureSampler${r+1}: sampler;`)}return t.join(`
`)}function Wt(n){const t=[];if(n===1)t.push("outColor = textureSampleGrad(textureSource1, textureSampler1, vUV, uvDx, uvDy);");else{t.push("switch vTextureId {");for(let e=0;e<n;e++)e===n-1?t.push("  default:{"):t.push(`  case ${e}:{`),t.push(`      outColor = textureSampleGrad(textureSource${e+1}, textureSampler${e+1}, vUV, uvDx, uvDy);`),t.push("      break;}");t.push("}")}return t.join(`
`)}function te(n){return B[n]||(B[n]={name:"texture-batch-bit",vertex:{header:`
                @in aTextureIdAndRound: vec2<u32>;
                @out @interpolate(flat) vTextureId : u32;
            `,main:`
                vTextureId = aTextureIdAndRound.y;
            `,end:`
                if(aTextureIdAndRound.x == 1)
                {
                    vPosition = vec4<f32>(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
                }
            `},fragment:{header:`
                @in @interpolate(flat) vTextureId: u32;
    
                ${Ht(16)}
            `,main:`
                var uvDx = dpdx(vUV);
                var uvDy = dpdy(vUV);
    
                ${Wt(16)}
            `}}),B[n]}const k={};function Xt(n){const t=[];for(let e=0;e<n;e++)e>0&&t.push("else"),e<n-1&&t.push(`if(vTextureId < ${e}.5)`),t.push("{"),t.push(`	outColor = texture(uTextures[${e}], vUV);`),t.push("}");return t.join(`
`)}function ee(n){return k[n]||(k[n]={name:"texture-batch-bit",vertex:{header:`
                in vec2 aTextureIdAndRound;
                out float vTextureId;
              
            `,main:`
                vTextureId = aTextureIdAndRound.y;
            `,end:`
                if(aTextureIdAndRound.x == 1.)
                {
                    gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
                }
            `},fragment:{header:`
                in float vTextureId;
    
                uniform sampler2D uTextures[${n}];
              
            `,main:`
    
                ${Xt(16)}
            `}}),k[n]}const re={name:"round-pixels-bit",vertex:{header:`
            fn roundPixels(position: vec2<f32>, targetSize: vec2<f32>) -> vec2<f32> 
            {
                return (floor((position * 0.5 + 0.5) * targetSize) / targetSize) * 2.0 - 1.0;
            }
        `}},ne={name:"round-pixels-bit",vertex:{header:`   
            vec2 roundPixels(vec2 position, vec2 targetSize)
            {       
                return (floor((position * 0.5 + 0.5) * targetSize) / targetSize) * 2.0 - 1.0;
            }
        `}},N={name:"local-uniform-bit",vertex:{header:`

            struct LocalUniforms {
                uTransformMatrix:mat3x3<f32>,
                uColor:vec4<f32>,
                uRound:f32,
            }

            @group(1) @binding(0) var<uniform> localUniforms : LocalUniforms;
        `,main:`
            vColor *= localUniforms.uColor;
            modelMatrix *= localUniforms.uTransformMatrix;
        `,end:`
            if(localUniforms.uRound == 1)
            {
                vPosition = vec4(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
            }
        `}},oe={...N,vertex:{...N.vertex,header:N.vertex.header.replace("group(1)","group(2)")}},se={name:"local-uniform-bit",vertex:{header:`

            uniform mat3 uTransformMatrix;
            uniform vec4 uColor;
            uniform float uRound;
        `,main:`
            vColor *= uColor;
            modelMatrix = uTransformMatrix;
        `,end:`
            if(uRound == 1.)
            {
                gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
            }
        `}};class ie{constructor(){this.vertexSize=4,this.indexSize=6,this.location=0,this.batcher=null,this.batch=null,this.roundPixels=0}get blendMode(){return this.renderable.groupBlendMode}packAttributes(t,e,r,o){const s=this.renderable,a=this.texture,i=s.groupTransform,c=i.a,l=i.b,u=i.c,f=i.d,m=i.tx,d=i.ty,h=this.bounds,v=h.maxX,x=h.minX,b=h.maxY,P=h.minY,p=a.uvs,G=s.groupColorAlpha,C=o<<16|this.roundPixels&65535;t[r+0]=c*x+u*P+m,t[r+1]=f*P+l*x+d,t[r+2]=p.x0,t[r+3]=p.y0,e[r+4]=G,e[r+5]=C,t[r+6]=c*v+u*P+m,t[r+7]=f*P+l*v+d,t[r+8]=p.x1,t[r+9]=p.y1,e[r+10]=G,e[r+11]=C,t[r+12]=c*v+u*b+m,t[r+13]=f*b+l*v+d,t[r+14]=p.x2,t[r+15]=p.y2,e[r+16]=G,e[r+17]=C,t[r+18]=c*x+u*b+m,t[r+19]=f*b+l*x+d,t[r+20]=p.x3,t[r+21]=p.y3,e[r+22]=G,e[r+23]=C}packIndex(t,e,r){t[e]=r+0,t[e+1]=r+1,t[e+2]=r+2,t[e+3]=r+0,t[e+4]=r+2,t[e+5]=r+3}reset(){this.renderable=null,this.texture=null,this.batcher=null,this.batch=null,this.bounds=null}}function ae(n,t,e){const r=(n>>24&255)/255;t[e++]=(n&255)/255*r,t[e++]=(n>>8&255)/255*r,t[e++]=(n>>16&255)/255*r,t[e++]=r}export{ie as B,_ as G,qt as S,At as U,Jt as a,it as b,Yt as c,H as d,N as e,nt as f,te as g,Mt as h,ae as i,Zt as j,Qt as k,oe as l,ee as m,ne as n,se as o,re as r};
