import{j as e}from"./jsx-runtime-Z5uAzocK.js";import{r as n}from"./index-pP6CS22B.js";import{within as h,userEvent as y}from"./index-DgAF9SIF.js";import{c as C}from"./lib-BLSKlp9E.js";import{B as s}from"./Button-Cd938xBQ.js";import{I as D}from"./Input-CqW3ui8N.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-DglmNpsn.js";const G={sm:"max-w-sm",md:"max-w-lg",lg:"max-w-2xl",xl:"max-w-4xl"},v=({open:a,onClose:r,title:t,description:l,children:d,className:X,size:K="md",hideCloseButton:j=!1})=>{const N=n.useRef(null),B=n.useId(),w=n.useId();return n.useEffect(()=>{if(!a)return;const E=N.current;if(!E)return;const H=["button:not([disabled])","a[href]","input:not([disabled])","textarea:not([disabled])","select:not([disabled])",'[tabindex]:not([tabindex="-1"])'].join(", "),c=E.querySelectorAll(H),o=c[0],m=c[c.length-1];o==null||o.focus();const A=i=>{if(i.key==="Escape"){r();return}if(i.key==="Tab"){if(c.length===0){i.preventDefault();return}i.shiftKey?document.activeElement===o&&(i.preventDefault(),m==null||m.focus()):document.activeElement===m&&(i.preventDefault(),o==null||o.focus())}};return document.addEventListener("keydown",A),()=>document.removeEventListener("keydown",A)},[a,r]),n.useEffect(()=>(a?document.body.style.overflow="hidden":document.body.style.overflow="",()=>{document.body.style.overflow=""}),[a]),a?e.jsxs("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4",role:"presentation",children:[e.jsx("div",{className:"absolute inset-0 bg-black/50 backdrop-blur-sm","aria-hidden":"true",onClick:r}),e.jsxs("div",{ref:N,role:"dialog","aria-modal":"true","aria-labelledby":t?B:void 0,"aria-describedby":l?w:void 0,className:C("relative z-10 w-full rounded-xl border border-[#D0DDE6] bg-white","shadow-2xl shadow-black/10","animate-[fadeIn_0.15s_ease-out]",G[K],X),style:{animation:"iit-fadeIn 0.15s ease-out"},children:[(t||!j)&&e.jsxs("div",{className:"flex items-start justify-between gap-4 p-6 pb-4",children:[e.jsxs("div",{children:[t&&e.jsx("h2",{id:B,className:"text-lg font-semibold text-[#0D1B26]",children:t}),l&&e.jsx("p",{id:w,className:"mt-1 text-sm text-[#4A6070]",children:l})]}),!j&&e.jsx("button",{onClick:r,"aria-label":"Close dialog",className:C("shrink-0 rounded-lg p-1.5 text-[#8A9FAF]","hover:bg-[#F5F8FA] hover:text-[#0D1B26]","transition-colors duration-150","focus:outline-none focus:ring-2 focus:ring-[#0097D6]"),children:e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2","aria-hidden":"true",children:[e.jsx("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),e.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]}),e.jsx("div",{className:"px-6 pb-6",children:d})]})]}):null};v.displayName="Modal";v.__docgenInfo={description:"",methods:[],displayName:"Modal",props:{open:{required:!0,tsType:{name:"boolean"},description:""},onClose:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},title:{required:!1,tsType:{name:"string"},description:""},description:{required:!1,tsType:{name:"string"},description:""},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:""},size:{required:!1,tsType:{name:"union",raw:"'sm' | 'md' | 'lg' | 'xl'",elements:[{name:"literal",value:"'sm'"},{name:"literal",value:"'md'"},{name:"literal",value:"'lg'"},{name:"literal",value:"'xl'"}]},description:"Size of the modal dialog",defaultValue:{value:"'md'",computed:!1}},hideCloseButton:{required:!1,tsType:{name:"boolean"},description:"Hide the default close button",defaultValue:{value:"false",computed:!1}}}};function b({triggerLabel:a="Abrir Modal",triggerVariant:r="primary",...t}){const[l,d]=n.useState(!1);return e.jsxs("div",{children:[e.jsx(s,{variant:r,onClick:()=>d(!0),children:a}),e.jsx(v,{...t,open:l,onClose:()=>d(!1)})]})}const te={title:"Components/Modal",component:v,tags:["autodocs"],argTypes:{open:{control:"boolean",description:"Controla a visibilidade do modal"},title:{control:"text",description:"Título do modal"},description:{control:"text",description:"Subtítulo/descrição do modal"},size:{control:"select",options:["sm","md","lg","xl"],description:"Largura máxima do painel",table:{defaultValue:{summary:"md"}}},hideCloseButton:{control:"boolean",description:"Oculta o botão X de fechamento",table:{defaultValue:{summary:"false"}}}},parameters:{layout:"centered"}},u={args:{open:!0,onClose:()=>{},title:"Título do Modal",description:"Descrição opcional do modal.",children:e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx("p",{className:"text-sm text-[#4A6070]",children:"Conteúdo do modal. Adicione formulários, confirmações ou qualquer conteúdo aqui."}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx(s,{size:"sm",children:"Confirmar"}),e.jsx(s,{size:"sm",variant:"secondary",children:"Cancelar"})]})]})}},p={args:{open:!1,onClose:()=>{}},render:()=>e.jsxs(b,{size:"sm",title:"Confirmar exclusão",description:"Esta ação é irreversível.",triggerLabel:"Abrir Modal sm",triggerVariant:"destructive",children:[e.jsx("div",{className:"bg-red-50 border border-red-200 rounded-lg p-3 mb-4",children:e.jsx("p",{className:"text-sm text-red-700",children:"⚠️ Todos os dados serão permanentemente removidos."})}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx(s,{variant:"destructive",size:"sm",children:"🗑️ Excluir"}),e.jsx(s,{variant:"secondary",size:"sm",children:"Cancelar"})]})]}),play:async({canvasElement:a})=>{const t=h(a).getByRole("button",{name:/Abrir Modal sm/i});await y.click(t)}},g={args:{open:!1,onClose:()=>{}},render:()=>e.jsx(b,{size:"md",title:"Editar perfil",description:"Atualize suas informações pessoais.",triggerLabel:"Abrir Modal md (default)",children:e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx(D,{label:"Nome completo",defaultValue:"Antonio Pedro Santana Ferreira"}),e.jsx(D,{label:"Email",defaultValue:"antonio@institutoitinerante.com.br",type:"email"}),e.jsxs("div",{className:"flex gap-2 mt-2",children:[e.jsx(s,{children:"Salvar alterações"}),e.jsx(s,{variant:"secondary",children:"Cancelar"})]})]})}),play:async({canvasElement:a})=>{const t=h(a).getByRole("button",{name:/Abrir Modal md/i});await y.click(t)}},x={args:{open:!1,onClose:()=>{}},render:()=>e.jsxs(b,{size:"lg",title:"Selecionar componentes",description:"Escolha os componentes para adicionar ao projeto.",triggerLabel:"Abrir Modal lg",triggerVariant:"accent",children:[e.jsx("div",{className:"grid grid-cols-2 gap-3 mb-4",children:["Button","Card","Input","Badge","Select","Textarea","Modal","Skeleton"].map(a=>e.jsxs("label",{className:"flex items-center gap-2 p-3 rounded-lg border border-[#D0DDE6] hover:border-[#0097D6] cursor-pointer transition-colors",children:[e.jsx("input",{type:"checkbox",className:"accent-[#0097D6]",defaultChecked:["Button","Input","Badge"].includes(a)}),e.jsx("span",{className:"text-sm font-medium text-[#0D1B26]",children:a})]},a))}),e.jsx(s,{children:"Adicionar selecionados"})]}),play:async({canvasElement:a})=>{const t=h(a).getByRole("button",{name:/Abrir Modal lg/i});await y.click(t)}},f={args:{open:!1,onClose:()=>{}},render:()=>e.jsx(b,{size:"xl",title:"Preview do componente",description:"Visualização completa com código fonte.",triggerLabel:"Abrir Modal xl",triggerVariant:"ghost",children:e.jsxs("div",{className:"flex gap-4",children:[e.jsx("div",{className:"flex-1 rounded-lg bg-[#F5F8FA] border border-[#D0DDE6] p-4 flex items-center justify-center min-h-[200px]",children:e.jsx(s,{children:"Preview ao vivo"})}),e.jsx("div",{className:"flex-1 bg-[#0A0F14] rounded-lg p-4",children:e.jsx("code",{className:"text-xs text-[#00D6A0] font-mono whitespace-pre-wrap block",children:`<Button variant="primary">
  Clique aqui
</Button>`})})]})})};var M,k,z;u.parameters={...u.parameters,docs:{...(M=u.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    open: true,
    onClose: () => {},
    title: 'Título do Modal',
    description: 'Descrição opcional do modal.',
    children: <div className="flex flex-col gap-4">
        <p className="text-sm text-[#4A6070]">
          Conteúdo do modal. Adicione formulários, confirmações ou qualquer conteúdo aqui.
        </p>
        <div className="flex gap-2">
          <Button size="sm">Confirmar</Button>
          <Button size="sm" variant="secondary">Cancelar</Button>
        </div>
      </div>
  }
}`,...(z=(k=u.parameters)==null?void 0:k.docs)==null?void 0:z.source}}};var T,S,q;p.parameters={...p.parameters,docs:{...(T=p.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    open: false,
    onClose: () => {}
  },
  render: () => <ModalWithTrigger size="sm" title="Confirmar exclusão" description="Esta ação é irreversível." triggerLabel="Abrir Modal sm" triggerVariant="destructive">
      <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
        <p className="text-sm text-red-700">⚠️ Todos os dados serão permanentemente removidos.</p>
      </div>
      <div className="flex gap-2">
        <Button variant="destructive" size="sm">🗑️ Excluir</Button>
        <Button variant="secondary" size="sm">Cancelar</Button>
      </div>
    </ModalWithTrigger>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', {
      name: /Abrir Modal sm/i
    });
    await userEvent.click(trigger);
  }
}`,...(q=(S=p.parameters)==null?void 0:S.docs)==null?void 0:q.source}}};var V,F,I;g.parameters={...g.parameters,docs:{...(V=g.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    open: false,
    onClose: () => {}
  },
  render: () => <ModalWithTrigger size="md" title="Editar perfil" description="Atualize suas informações pessoais." triggerLabel="Abrir Modal md (default)">
      <div className="flex flex-col gap-4">
        <Input label="Nome completo" defaultValue="Antonio Pedro Santana Ferreira" />
        <Input label="Email" defaultValue="antonio@institutoitinerante.com.br" type="email" />
        <div className="flex gap-2 mt-2">
          <Button>Salvar alterações</Button>
          <Button variant="secondary">Cancelar</Button>
        </div>
      </div>
    </ModalWithTrigger>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', {
      name: /Abrir Modal md/i
    });
    await userEvent.click(trigger);
  }
}`,...(I=(F=g.parameters)==null?void 0:F.docs)==null?void 0:I.source}}};var L,R,W;x.parameters={...x.parameters,docs:{...(L=x.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    open: false,
    onClose: () => {}
  },
  render: () => <ModalWithTrigger size="lg" title="Selecionar componentes" description="Escolha os componentes para adicionar ao projeto." triggerLabel="Abrir Modal lg" triggerVariant="accent">
      <div className="grid grid-cols-2 gap-3 mb-4">
        {['Button', 'Card', 'Input', 'Badge', 'Select', 'Textarea', 'Modal', 'Skeleton'].map(c => <label key={c} className="flex items-center gap-2 p-3 rounded-lg border border-[#D0DDE6] hover:border-[#0097D6] cursor-pointer transition-colors">
            <input type="checkbox" className="accent-[#0097D6]" defaultChecked={['Button', 'Input', 'Badge'].includes(c)} />
            <span className="text-sm font-medium text-[#0D1B26]">{c}</span>
          </label>)}
      </div>
      <Button>Adicionar selecionados</Button>
    </ModalWithTrigger>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', {
      name: /Abrir Modal lg/i
    });
    await userEvent.click(trigger);
  }
}`,...(W=(R=x.parameters)==null?void 0:R.docs)==null?void 0:W.source}}};var P,_,O;f.parameters={...f.parameters,docs:{...(P=f.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    open: false,
    onClose: () => {}
  },
  render: () => <ModalWithTrigger size="xl" title="Preview do componente" description="Visualização completa com código fonte." triggerLabel="Abrir Modal xl" triggerVariant="ghost">
      <div className="flex gap-4">
        <div className="flex-1 rounded-lg bg-[#F5F8FA] border border-[#D0DDE6] p-4 flex items-center justify-center min-h-[200px]">
          <Button>Preview ao vivo</Button>
        </div>
        <div className="flex-1 bg-[#0A0F14] rounded-lg p-4">
          <code className="text-xs text-[#00D6A0] font-mono whitespace-pre-wrap block">
            {'<Button variant="primary">\\n  Clique aqui\\n</Button>'}
          </code>
        </div>
      </div>
    </ModalWithTrigger>
}`,...(O=(_=f.parameters)==null?void 0:_.docs)==null?void 0:O.source}}};const re=["Default","Small","Medium","Large","XLarge"];export{u as Default,x as Large,g as Medium,p as Small,f as XLarge,re as __namedExportsOrder,te as default};
