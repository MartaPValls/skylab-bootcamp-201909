function Results({duckslist, onClickItem}){


   const list =  duckslist.map((duck,i) => 
       
       <ResultItem key={i.toString()} onGoDetail={onClickItem} pato={duck} /> 
   ) 
   debugger
    return <ul className="item-list"> {list}  
    </ul>
    
}

