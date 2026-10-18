export function summarizeOrders(orders,from='',to=''){
 const selected=orders.filter(o=>(!from||o.day>=from)&&(!to||o.day<=to));
 const active=selected.filter(o=>!o.cancelledAt),products=new Map(),days=new Map(),hours=Array.from({length:24},(_,hour)=>({hour,revenue:0,count:0}));
 let revenue=0,quantity=0,served=0;
 for(const o of active){revenue+=o.total;if(o.servedAt)served++;
  const day=days.get(o.day)||{day:o.day,revenue:0,count:0};day.revenue+=o.total;day.count++;days.set(o.day,day);
  const hour=Number(new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Tokyo',hour:'2-digit',hourCycle:'h23'}).format(new Date(o.createdAt)));hours[hour].revenue+=o.total;hours[hour].count++;
  for(const item of o.items){const key=item.id||item.name;const p=products.get(key)||{name:item.name,quantity:0,revenue:0};p.quantity+=item.qty;p.revenue+=item.price*item.qty;quantity+=item.qty;products.set(key,p)}
 }
 return {revenue,count:active.length,average:active.length?Math.round(revenue/active.length):0,quantity,served,pending:active.length-served,cancelled:selected.length-active.length,products:[...products.values()].sort((a,b)=>b.quantity-a.quantity||b.revenue-a.revenue),days:[...days.values()].sort((a,b)=>a.day.localeCompare(b.day)),hours};
}
