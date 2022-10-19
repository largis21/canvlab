export default function Resizer( props ) {
  const minWidth = props.minWidth || 0
  var target;

  function handleMouseDown(event) {
    target = event.target
    window.addEventListener("mousemove", onMouseMove)
    target.parentNode.parentNode.addEventListener("mouseleave", () => {
      window.removeEventListener("mousemove", onMouseMove)
    })
    window.addEventListener("mouseup", handleMouseUp)
  }

  function handleMouseUp(event) {
    window.removeEventListener("mousemove", onMouseMove)
  }

  function onMouseMove(event) {
    const element = target.parentNode
    const newWidth = event.pageX - element.getBoundingClientRect().left

    if (newWidth < minWidth) {
      target.parentNode.style.width = `${minWidth}px`
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