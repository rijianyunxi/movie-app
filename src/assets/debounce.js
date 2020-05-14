// function debounce(fn,wait){
//     var timer = null;
//     return function(){
//         if(timer !== null){
//             clearTimeout(timer);
//         }
//         timer = setTimeout(fn,wait);
//     }
// }

let timeout = null
function debounce(fn, wait) {
 if(timeout !== null) clearTimeout(timeout)
 timeout = setTimeout(fn, wait)
}

export default debounce