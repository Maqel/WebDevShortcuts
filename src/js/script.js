'use strict';
{
  /*VARIABLES*/
  const opts = {
    articleSelector: '.post',
    titleSelector: '.post-title',
    titleListSelector: '.titles',
    articleTagsSelector: '.post-tags .list',
    categorySelector: '.post-category',
    CategoryListSelector: '.section.list',
    tagsListSelector: '.tags.list',
    cloudClassCount: 5,
    cloudClassPrefix:  'tag-size-'
  };

  /* TITLE */
  const titleClickHandler = function (event) {
    /*[DONE] prevent default action for this event*/
    event.preventDefault();
    /*[DONE] make new constant named "clickedElement" and give it the value of "this"*/
    const clickedElement = this;
    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');
    /*[DONE][START LOOP]: for each ActiveLink*/
    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
      /*[DONE][END LOOP]: for each ActiveLink*/
    }
    /* [DONE] add class 'active' to the clicked link */
    clickedElement.classList.add('active');
    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts .active');
    /*[DONE][START LOOP]: for each active Article*/
    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
      /*[DONE][END LOOP]: for each active Article*/
    }
    /* [DONE] get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    /*[DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    /* [DONE] add class 'active' to the correct article */
    targetArticle.classList.add('active');
  };

  function generateTitleLinks(customSelector = '') {
    /* [DONE] remove contents of titleList */
    const titleList = document.querySelector(opts.titleListSelector);
    titleList.innerHTML = '';
    /* [DONE] find all the articles and save them to variable: articles */
    const articles = document.querySelectorAll(opts.articleSelector + customSelector);
    let html = '';
    /* [DONE] for each article */
    for (let article of articles) {
      /* [DONE] get the article id */
      const articleId = article.getAttribute('id');
      /* [DONE] find the title element */
      const titleElement = article.querySelector(opts.titleSelector);
      /* [DONE] get the title from the title element */
      const title = titleElement.innerHTML;
      /* [DONE] create HTML of the link */
      const link = '<li><a href="#' + articleId + '"><span>' + title + '</span></a></li>';
      /* [DONE] insert link into titleList */
      titleList.insertAdjacentHTML('beforeend', link);
      /* [DONE] insert link into html variable */
      html = html + link;
      /*[-DONE-][END-LOOP]: for each article*/
    }
    titleList.innerHTML = html;
    /*[DONE] Add tagClickHandler as event listener for that link*/
    const links = document.querySelectorAll('.titles a');
    /*[DONE][START LOOP]: For each link*/
    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
      /*[END LOOP]: For each link*/
    }
  }
  generateTitleLinks();

  /* TAGS */
  function calculateTagsParams(tags){
    /*[DONE] Create a new params variable with min and max occurrence of the tag */
    const params = {
      max: 0,
      min: 999999
    };
    /*[DONE][START LOOP]: For each tag*/
    for(let tag in tags){
      if(tags[tag] > params.max){
        params.max = tags[tag];
      }
      if(tags[tag] < params.min){
        params.min = tags[tag];
      }
    } /*[DONE][END LOOP]: For each tag*/
    return params;
  }
  calculateTagsParams();

  function calculateTagClass(count, params){
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (opts.cloudClassCount - 1) + 1);
    return opts.cloudClassPrefix + classNumber;
  }

  function generateTags() {
    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};
    /*[DONE] find all articles */
    const articles = document.querySelectorAll(opts.articleSelector);
    /*[DONE] START LOOP: for every article: */
    for (let article of articles) {
      /*[DONE] find tags wrapper */
      const tagList = article.querySelector(opts.articleTagsSelector);
      /*[DONE] make html variable with empty string */
      let html = '';
      /*[DONE] get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      /*[DONE] split tags into array */
      const articleTagsArray = articleTags.split(' ');
      /*[DONE] START LOOP: for each tag */
      for (let tag of articleTagsArray) {
        /*[DONE] generate HTML of the link */
        const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
        /*[DONE] add generated code to html variable */
        html = html + ' ' + linkHTML;
        /* [NEW] check if this link is NOT already in allTags */
        if (!allTags[tag]) {
          /* [NEW] add tag to allTags object */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
        /*[DONE] END LOOP: for each tag */
      }
      /*[DONE] insert HTML of all the links into the tags wrapper */
      tagList.innerHTML =  html;
      /*[DONE] END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(opts.tagsListSelector);
    const tagsParams = calculateTagsParams(allTags);
    /* [NEW] create variable for all links HTML code */
    let allTagsHTML = '';
    /* [NEW] START LOOP: for each tag in allTags: */
    for (let tag in allTags) {
      /* [NEW] generate code of a link and add it to allTagsHTML */
      const tagLinkHTML = '<li><a href=#tag-' + tag + ' class="' +  calculateTagClass(allTags[tag], tagsParams) + '"<span>' +  tag  + '</span></a></li>';
      //console.log('tagLinkHTML:', tagLinkHTML);
      allTagsHTML += tagLinkHTML;
      /* [NEW] END LOOP: for each tag in allTags: */
    }
    /*[NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;
  }
  generateTags();

  function tagClickHandler(event) {
    /*[DONE] prevent default action for this event */
    event.preventDefault();
    /*[DONE] make new constant named 'clickedElement' and give it the value of 'this' */
    const clickedElement = this;
    /*[DONE] make a new constant 'href' and read the attribute 'href' of the clicked element */
    const href = clickedElement.getAttribute('href');
    /*[DONE] make a new constant 'tag' and extract tag from the 'href' constant */
    const tag = href.replace('#tag-', '');
    /*[DONE] find all tag links with class active */
    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
    /*[DONE] START LOOP: for each active tag link */
    for (let activeTag of activeTags) {
      /*[DONE] remove class active */
      activeTag.classList.remove('active');
      /*[DONE] END LOOP: for each active tag link */
    }
    /*[DONE] find all tag links with 'href' attribute equal to the 'href' constant */
    const tagLinks = document.querySelectorAll('a[href^="#tag-' + href + '"]');
    /*[DONE] START LOOP: for each found tag link */
    for (let tagLink of tagLinks) {
      /*[DONE] add class active */
      tagLink.classList.add('active');
      /*[DONE] END LOOP: for each found tag link */
    }
    /*[DONE] execute function 'generateTitleLinks' with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  function addClickListenersToTags() {
    /*[DONE] find all links to tags */
    const tagLinks = document.querySelectorAll('.tags a, .post-tags a');
    /*[DONE] START LOOP: for each link */
    for (let tagLink of tagLinks) {
      /*[DONE] add tagClickHandler as event listener for that link */
      tagLink.addEventListener('click', tagClickHandler);
      /*[DONE] END LOOP: for each link */
    }
  }
  addClickListenersToTags();

  /*CATEGORIES*/

  function generateCategories() {
    /*[-DONE-] find all articles*/
    const articles = document.querySelectorAll(opts.articleSelector);
    /*[-DONE-][START LOOP]: for every article:*/
    for (let article of articles) {
      /*[-DONE-] find categories wrapper*/
      const categoryWrapper = article.querySelector(opts.categorySelector);
      /*[-DONE-] get categories from data-category attribute*/
      const categories = article.getAttribute('data-category');
      /*[-DONE-] generate HTML of the link*/
      const linkCategory =
        '<p class="post-category"><a href="#category-' +
        categories +
        '"><span>' +
        categories +
        '</span></a></p>';
      /*[-DONE-] insert HTML of all the links into the categories wrapper*/
      categoryWrapper.innerHTML = linkCategory;
    } /*[-DONE-] END LOOP: for every article:*/
  }
  generateCategories();

  function categoryClickHandler(event) {
    /* prevent default action for this event*/
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this”*/
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element*/
    const href = clickedElement.getAttribute('href');
    /* make a new constant "category" and extract tag from the "href" constant*/
    const category = href.replace('#category-', '');
    /* find all tagCategory links with class active*/
    const activeCategories = document.querySelectorAll(
      'a .active[href^="#category-"]'
    );
    /* [START LOOP]: for each active tagCategory link*/
    for (let activeCategory of activeCategories) {
      /* remove class active */
      activeCategory.classList.remove('active');
      /* [END LOOP]: for each active tagCategory link*/
    }
    /* find all tag links with "href" attribute equal to the "href" constant*/
    const categoriesLinks = document.querySelectorAll('[href^="#category-"]');
    /* [START LOOP]: for each found category link*/
    for (let categoryLink of categoriesLinks) {
      /* Add class active */
      categoryLink.classList.add('active');
      /* [END LOOP]: for each found category link*/
    }
    /* execute function "generateTitleLinks" with article selector as argument*/
    generateTitleLinks('[data-category="' + category + '"]');
  }

  function addClickListenersToCategories() {
    /* find all links to tagCategories*/
    const links = document.querySelectorAll('[href^="#category-"]');
    /* [START LOOP:] for each link*/
    for (const link of links) {
      /* add tagClickHandler as event listener for that link*/
      link.addEventListener('click', categoryClickHandler);
      /* [END LOOP]: for each link*/
    }
  }
  addClickListenersToCategories();
}
