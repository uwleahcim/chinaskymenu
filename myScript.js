// window.addEventListener('resize', reportWindowSize);


// function reportWindowSize(){

//   var itemsContainer = document.getElementsByClassName('js-collapse');
//   for (var i = 0; i < itemsContainer.length; i++) {
//     var section = itemsContainer[i];
//     var isCollapsed = section.getAttribute('data-collapsed') === 'true'; 
//     if(isCollapsed) {
//       break
//     } else {
//       //itemsContainer[i].style.height = 'auto';
//       itemsContainer[i].style.height = itemsContainer[i].firstElementChild.scrollHeight + 'px';  
//     }
//   };

//   var demo = document.getElementById('debug');
//   demo.innerHTML = itemsContainer[1].firstElementChild.scrollHeight;
// };




addListeners();

function addListeners() {
  var categoryNameContainer = document.getElementsByClassName('category-name-container');
	for (var i = 0; i < categoryNameContainer.length; i++) {
		categoryNameContainer[i].addEventListener("click", ToggleSectionCollapseExpand);
	};
};

function ToggleSectionCollapseExpand(){

  var collapsibles = document.getElementsByClassName('js-collapse');
  for (var i = 0; i < collapsibles.length; i++) {
    var section = collapsibles[i];
    var isCollapsed = section.getAttribute('data-collapsed') === 'true';
    if (isCollapsed) {
      expandSection(section);
    } else {
      collapseSection(section);
    }
  }
  this.parentElement.scrollIntoView();
};


function collapseSection(element) {
  // get the height of the element's inner content, regardless of its actual size
  var sectionHeight = element.scrollHeight;

  // temporarily disable all css transitions
  var elementTransition = element.style.transition;
  element.style.transition = '';

  // on the next frame (as soon as the previous style change has taken effect),
  // explicitly set the element's height to its current pixel height, so we 
  // aren't transitioning out of 'auto'
  requestAnimationFrame(function(){
    collapseSectionTransitionStart(element,elementTransition);
  });
  requestAnimationFrame(function(){
    element.setAttribute('data-collapsed', 'true');
  });
};

function collapseSectionTransitionStart(element, elementTransition) {
  element.style.height = element.scrollHeight + 'px';
  element.style.transition = elementTransition;
  // on the next frame (as soon as the previous style change has taken effect),
  // have the element transition to height: 0
  requestAnimationFrame(function(){
    collapseSectionSetHeightZero(element);
  });
};

function collapseSectionSetHeightZero(element) {
  element.style.height = 0 + 'px';
};

function expandSection(element) {
  // get the height of the element's inner content, regardless of its actual size
  var sectionHeight = element.scrollHeight;

  // have the element transition to the height of its inner content
  element.style.height = sectionHeight + 'px';

  // when the next css transition finishes (which should be the one we just triggered)
  //element.addEventListener('transitionend', expandSectionTransitionEnd);
  element.style.height = "auto";
  element.setAttribute('data-collapsed', 'false');
};

function expandSectionTransitionEnd(event) {
  alert(this.innerHTML)
  // remove this event listener so it only gets triggered once
  this.removeEventListener('transitionend', expandSectionTransitionEnd);
  // to keep toggle and flagged sync if transition is interrupted
  if (this.getAttribute('data-collapsed') === 'false') {
    this.style.height = "auto";
    alert('hello')
  };
  this.scrollIntoView();
};
