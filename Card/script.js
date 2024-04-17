const carousel = document.querySelector(".carousel"),
firstImg = carousel.querySelectorAll("img")[0];
arrowIcons = document.querySelectorAll(".card-wrapper i");

let isDragStart = false, isDragging = false, prevpageX, prevScrollLeft, positionDiff;
// let firstImgWidth = firstImg.clientWidth + 14;// getting first img width & adding 14 mardin value
// let scrollWidth = carousel.scrollWidth - carousel.clientWidth;//getting max scrollable width

const showHideIcons = () => {
    //showing and hiding prev/next icon according to carousel scroll left value
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth;//getting max scrollable width
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";

}

arrowIcons.forEach(icon =>{
    icon.addEventListener("click", ()  =>{
        let firstImgWidth = firstImg.clientWidth + 14;// getting first img width & adding 14 mardin value
        // if clicked icon is left, reduce width value from the carousel scroll left else add to it
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60);//calling showhideIcons after 60ms

    });
});

const autoSlide = () =>{
    if(carousel.scrollLeft ==(carousel.scrollWidth - carousel.clientWidth)) return;
    positionDiff = Math.abs(positionDiff);
    let firstImgWidth = firstImg.clientWidth + 14;
    let valDifference = firstImgWidth - positionDiff;

    if(carousel.scrollLeft> prevScrollLeft){// if user is scrolling to the right
        return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference: positionDiff; 
    }
    // if user is scrolling to the left
    carousel.scrollLeft = positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    

}
const dragStart = (e) =>{
    // updating global variable value on mouse down event
    isDragStart = true;
    prevpageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}
const dragging = (e) => {
    //scrolling images/ carousel to left according to mouse pointer
    if(!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touched[0] .pageX)- prevpageX;
    carousel.scrollLeft = prevScrollLeft- positionDiff;
    showHideIcons();

}

const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");
    if(!isDragging) return;
    isDragging = false;
    autoSlide();
}
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("mouseleave", dragStop);
carousel.addEventListener("touchend", dragStart);
