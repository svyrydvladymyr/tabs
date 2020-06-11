//Headers will fill the entire space, regardless of their total width, if set to "1" and not if "0".
const config = { tabTitileParams: "0" }
const cList = {
    tabWrap: 'kalcifer_tabs',
    tabTitle: 'kalcifer_titles',
    tabContent: 'kalcifer_content',
    activeTitle: 'title_active',
    activeContent: 'content_active',
    borderRadius: 'border-top-right-radius'
}
const tabs = document.getElementsByClassName(cList.tabWrap);
const getParams = (el, param) => parseInt(getComputedStyle(el).getPropertyValue(param));
const getTabPart = (tabPart, classPart) => {
    for (const part of tabPart) {part.classList.remove(classPart)};
    tabPart[0].classList.add(classPart); 
};

// console.log("tab", tabs);

for(const tab of tabs){
    let sumWidth = 0;
    const events = ['load', 'resize', 'click'];
    const titles = tab.getElementsByClassName(cList.tabTitle)[0].children;
    const contents = tab.getElementsByClassName(cList.tabContent);
    getTabPart(titles, cList.activeTitle);
    getTabPart(contents, cList.activeContent);
    const contentBorderRadius = getParams(contents[0], cList.borderRadius);  

    // console.log("tab", tab);
    // const titles = getTabPart(tab.getElementsByClassName(cList.tabTitle)[0].children, cList.activeTitle);
    // const contents = getTabPart(tab.getElementsByClassName(cList.tabContent), cList.activeContent);
    // const titles = tab.getElementsByClassName(cList.tabTitle)[0].children;
    // const contents = tab.getElementsByClassName(cList.tabContent); 
    // for (const title of titles) {title.classList.remove(cList.activeTitle)};
    // for (const content of contents) {content.classList.remove(cList.activeContent)};
    // titles[0].classList.add(cList.activeTitle);  
    // contents[0].classList.add(cList.activeContent);

    // console.log("titles", titles);
    // console.log("content", contents);

    // const contentActive = getClass(tab, 'content_active')[0];
    // console.log("contentActive",  getClass(tab, 'content_active')[0]);
    // console.log("contentActive", getClass(tab, 'content_active'));

    for (let i = 0; i < titles.length; i++) {    
        sumWidth += titles[i].clientWidth + getParams(titles[i], 'border-left') + getParams(titles[i], 'border-right');

        // titles[i].addEventListener('click', function(){
            // for (const value of this.parentElement.children) { value.classList.remove('title_active') };             
            // this.classList.add('title_active');
            // for (const value of contents) { value.classList.remove('content_active') };  
            // contents[i].classList.add('content_active');   


            // const contentWidth = contents[i].clientWidth + getParams(contents[i], 'border-left') + getParams(contents[i], 'border-right');
            // sumWidth = (config.tabTitileParams == 1) ? contentWidth : sumWidth;

            // contents[i].style.borderTopRightRadius = (sumWidth >= contentWidth) ? '0px' 
            //     : ((sumWidth < contentWidth) && ((sumWidth + contentBorderRadius) > contentWidth)) ? `${contentWidth - sumWidth}px` 
            //     : `${contentBorderRadius}px`;
        // });

        // console.log("titleclientWidth", title.clientWidth);
        // console.log("title", title);
        // console.log("titleBorderL", titleBorderL);
        // console.log("titleBorderR", titleBorderR);
        // console.log("sumWidth", sumWidth);
        
        for(const event of events){

            // const eventArray = (event === 'click') ? titles[i] : window;

            ((event === 'click') ? titles[i] : window).addEventListener(event, function() { 
                if (event === 'click') {
                    for (const value of this.parentElement.children) { value.classList.remove('title_active') };             
                    this.classList.add('title_active');
                    for (const value of contents) { value.classList.remove('content_active') };  
                    contents[i].classList.add('content_active');  
                }


                const contentActive = tab.getElementsByClassName('content_active')[0];
                // console.log("contentActive", getClass(tab, 'content_active')[0]);

                const contentWidth = contentActive.clientWidth + getParams(contentActive, 'border-left') + getParams(contentActive, 'border-right');
                sumWidth = (config.tabTitileParams == 1) ? contentWidth : sumWidth;
                
                // console.log("contentWidth", contentWidth);
                // console.log("sumWidth", sumWidth);


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


