

const tabs = document.getElementsByClassName('kalcifer_tabs');

console.log("tab", tabs);



for(const tab of tabs){
    
    console.log("tab", tab);

    const head = tab.getElementsByClassName('kalcifer_titles');
    console.log("head", head);


    const content = tab.getElementsByClassName('content_active');

    console.log("content", content);

    const contentBorderRadius = parseInt(getComputedStyle(content[0]).getPropertyValue('border-top-right-radius'));
    const contentWidth = content[0].clientWidth + 2;

    console.log("contentradius", contentBorderRadius);
    console.log("contentWidth", contentWidth);


    let sumWidth = 0;
    for(let title of head[0].children){


        console.log("title", title);
        console.log("titleclientWidth", title.clientWidth);

        sumWidth += title.clientWidth;

        console.log("sumWidth", sumWidth);


        const events = ['load', 'resize'];
        for(const event of events){
            window.addEventListener(event, () => { 
                if (sumWidth > contentWidth) {
                    content[0].style.borderTopRightRadius = '0px';
                } else if(contentBorderRadius < contentWidth) {
                    content[0].style.borderTopRightRadius = `${contentWidth - sumWidth}px`;
                }

                title.classList.remove('kalcifer_borderradius');
                (title.offsetTop === 0) ? title.classList.add('kalcifer_borderradius') : null;
            });
        }
    }


}


