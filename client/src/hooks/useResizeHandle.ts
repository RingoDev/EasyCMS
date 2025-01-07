import React, {useEffect, useRef, useState} from "react";
import throttle from "lodash.throttle";

export default function useResizeHandle<Element extends HTMLElement, Element2 extends HTMLElement>(
    initialPosition: number, throttleMilliseconds: number = 100, snapDistance: number = 10
): [
    position: number, handleRef: React.RefObject<Element>, containerRef: React.RefObject<Element2>, resizing: boolean
] {

    const [isDragging, setDragging] = useState<boolean>(false)
    const [position, setPosition] = useState<number>(initialPosition)
    const handleRef = useRef<Element>(null)
    const containerRef = useRef<Element2>(null)

    function startDrag(e: MouseEvent) {
        if (e.button !== 0) return
        if (e.target === handleRef.current) {
            e.preventDefault();
            setDragging(true)
        }
    }

    function stopDrag() {
        setDragging(false)
    }

    function moveHandle(e: MouseEvent) {
        const container = containerRef.current
        const handle = handleRef.current

        if (container && handle) {
            let pos = e.clientX
            if (pos < container.getBoundingClientRect().left + (snapDistance + handle.getBoundingClientRect().width / 2)) {
                pos = container.getBoundingClientRect().left
            } else if (pos > container.getBoundingClientRect().right - (snapDistance + handle.getBoundingClientRect().width / 2)) {
                pos = container.getBoundingClientRect().right;
            }
            setPosition(pos)
        }
    }

    const onMove = throttle(moveHandle, throttleMilliseconds);

    useEffect(() => {

        document.addEventListener('mousedown', startDrag);
        document.addEventListener('mouseup', stopDrag);
        return () => {
            document.removeEventListener('mousedown', startDrag);
            document.removeEventListener('mouseUp', stopDrag)
        }

    }, [handleRef]);

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', onMove);
            return () => {
                document.removeEventListener('mousemove', onMove)
            }
        }
    }, [isDragging, onMove])

    return [position, handleRef, containerRef, isDragging]
}