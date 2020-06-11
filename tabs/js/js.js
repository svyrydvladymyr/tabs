const cList = {
    tabWrap: 'kalcifer_tabs',
    tabTitle: 'kalcifer_titles',
    tabContent: 'kalcifer_content',
    activeTitle: 'title_active',
    activeContent: 'content_active',
    borderRadiusTR: 'border-top-right-radius'
}
const tabs = document.getElementsByClassName(cList.tabWrap);
const config = { tabTitileParams: `${(function() {
    for(const tab of tabs){       
        const param = tab.getAttribute('param');
        return (!isNaN(param) && param !== undefined && (param == 1 || param == 0)) ? param : 0; 
    }})()}`};
const getParams = (el, param) => parseInt(getComputedStyle(el).getPropertyValue(param));
const getTabPart = (tabPart, classPart) => {
    for (const part of tabPart) {part.classList.remove(classPart)};
    tabPart[0].classList.add(classPart); 
};

for (const tab of tabs){

    let sumWidth = 0;
    const events = ['load', 'resize', 'click'];
    const titles = tab.getElementsByClassName(cList.tabTitle)[0].children;
    const contents = tab.getElementsByClassName(cList.tabContent);
    getTabPart(titles, cList.activeTitle);
    getTabPart(contents, cList.activeContent);
    const contentBorderRadius = getParams(contents[0], cList.borderRadiusTR);  

    for (let i = 0; i < titles.length; i++) {    
        sumWidth += titles[i].clientWidth + getParams(titles[i], 'border-left') + getParams(titles[i], 'border-right');

        for(const event of events){

            ((event === 'click') ? titles[i] : window).addEventListener(event, function() { 
                if (event === 'click') {
                    for (const value of this.parentElement.children) { value.classList.remove('title_active') };             
                    this.classList.add('title_active');
                    for (const value of contents) { value.classList.remove('content_active') };  
                    contents[i].classList.add('content_active');  
                }

                const contentActive = tab.getElementsByClassName('content_active')[0];

                const contentWidth = contentActive.clientWidth + getParams(contentActive, 'border-left') + getParams(contentActive, 'border-right');
                sumWidth = (config.tabTitileParams == 1) ? contentWidth : sumWidth;

                titles[i].classList.remove('borderradius');
                titles[i].offsetTop === 0 ? titles[i].classList.add('borderradius') : null;

                titles[i].style.flexGrow = (config.tabTitileParams == 1) ? config.tabTitileParams 
                    : ((config.tabTitileParams == 0) && (sumWidth >= contentWidth)) ? 1 : 0;

                contentActive.style.borderTopRightRadius = (sumWidth >= contentWidth) ? '0px' 
                    : ((sumWidth < contentWidth) && ((sumWidth + contentBorderRadius) > contentWidth)) ? `${contentWidth - sumWidth}px` 
                    : `${contentBorderRadius}px`;
            });
        }
    }
}


