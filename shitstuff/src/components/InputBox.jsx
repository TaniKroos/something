


export function InputBox({label, placeholder ,onChange}) {
  if(label=="password"){
    return <div className="px-2 pb-1">
    <div className="text-sm font-medium text-left py-2">
      {label}
    </div>
    <input  onChange={onChange} type="password" placeholder={placeholder} className="w-full px-2 py-1  border rounded border-slate-200" />
  </div>
  }
    return <div className="px-2 pb-1">
      <div className="text-sm font-medium text-left py-2">
        {label}
      </div>
      <input  onChange={onChange} placeholder={placeholder} className="w-full px-2 py-1  border rounded border-slate-200" />
    </div>
}