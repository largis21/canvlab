export default function Resizer( props ) {
  var minWidth = 0
  var prevSibling = {x:0, width:0};
  var target;

  if (props.minWidth) minWidth = props.minWidth
  const minWidthInt = parseInt(minWidth)

  function handleMouseDown(event) {
    target = event.target
    window.addEventListener("mousemove", onMouseMove)
    target.parentNode.parentNode.addEventListener("mouseleave", () => {
      window.removeEventListener("mousemove", onMouseMove)
    })
    window.addEventListener("mouseup", handleMouseUp)
    try{
      prevSibling = event.target.parentNode.previousElementSibling.getBoundingClientRect()
    } catch {}
  }

  function handleMouseUp(event) {
    window.removeEventListener("mousemove", onMouseMove)
    prevSibling = {x:0, width:0};
  }

  function onMouseMove(event) {
    const newWidth = event.clientX-(prevSibling.x+prevSibling.width)

    if (newWidth < minWidthInt) {
      target.parentNode.style.width = `${minWidthInt}px`
    } else {
      target.parentNode.style.width = `${newWidth}px`
    }
  }

  return (
    <div 
      onMouseDown={handleMouseDown} 
      onMouseUp={handleMouseUp} 
      className="resizer">
    </div>
  )
}