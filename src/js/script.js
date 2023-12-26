'use strict';
{
  /*VARIABLES*/
  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleCategorySelector = '.post-category';

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
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    /* [DONE] find all the articles and save them to variable: articles */
    const articles = document.querySelectorAll(
      optArticleSelector + customSelector
    );
    let html = '';
    /* [DONE] for each article */
    for (let article of articles) {
      /* [DONE] get the article id */
      const articleId = article.getAttribute('id');
      /* [DONE] find the title element */
      const titleElement = article.querySelector(optTitleSelector);
      /* [DONE] get the title from the title element */
      const title = titleElement.innerHTML;
      /* [DONE] create HTML of the link */
      const link =
        '<li><a href="#' + articleId + '"><span>' + title + '</span></a></li>';
      /* [DONE] insert link into titleList */
      titleList.insertAdjacentHTML('beforeend', link);
      /* [DONE] insert link into html variable */
      html = html + link;
    }
    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  }
  generateTitleLinks();

  /* TAGS */
  function generateTags() {
    /*[DONE] find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    /*[DONE] START LOOP: for every article: */
    for (let article of articles) {
      /*[DONE] find tags wrapper */
      const tagsWrapper = article.querySelector(optArticleTagsSelector);
      tagsWrapper.innerHTML = '';
      /*[DONE] make html variable with empty string */
      let html = '';
      /*[DONE] get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      /*[DONE] split tags into array */
      const articleTagsArray = articleTags.split(' ');
      /*[DONE] START LOOP: for each tag */
      for (let tag of articleTagsArray) {
        /*[DONE] generate HTML of the link */
        const generatedTags =
          '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
        /*[DONE] add generated code to html variable */
        html = html + ' ' + generatedTags;
        /*[DONE] END LOOP: for each tag */
      }
      /*[DONE] insert HTML of all the links into the tags wrapper */
      tagsWrapper.innerHTML = tagsWrapper.innerHTML + html;
      /*[DONE] END LOOP: for every article: */
    }
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
    const tagLinks = document.querySelectorAll('.list.list-horizontal a');
    /*[DONE] START LOOP: for each link */
    for (let tagLink of tagLinks) {
      /*[DONE] add tagClickHandler as event listener for that link */
      tagLink.addEventListener('click', tagClickHandler);
      /*[DONE] END LOOP: for each link */
    }
  }
  addClickListenersToTags();

  function generateCategory() {
    /* find all categories */
    const articles = document.querySelectorAll(optArticleSelector);
    /* START LOOP: for every categories: */
    for (let article of articles) {
      /* find categories wrapper */
      const categoryWrapper = document.querySelector(
        optArticleCategorySelector
      );
      /* get tags from data-categories attribute */
      /* generate HTML of the link */
      /* add generated code to html variable */
      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the categories wrapper */
  }
  generateCategory();

  function categoryClickHandler(event) {
    /* prevent default action for this event*/
    /* make new constant named "clickedElement" and give it the value of "this”*/
    /* make a new constant "href" and read the attribute "href" of the clicked element*/
    /* make a new constant "tagCategory" and extract tag from the "href" constant*/
    /* find all tagCategory links with class active*/
    /* [START LOOP]: for each active tagCategory link*/
    /* remove class active */
    /* [END LOOP]: for each active tagCategory link*/
    /* find all tag links with "href" attribute equal to the "href" constant*/
    /* [START LOOP]: for each found category link*/
    /* Add class active */
    /* [END LOOP]: for each found category link*/
    /* execute function "generateTitleLinks" with article selector as argument*/
  }

  function addClickListenersToCategories() {
    /* find all links to tagCategories*/
    /* [START LOOP:] for each link*/
    /* add tagClickHandler as event listener for that link*/
    /* [END LOOP]: for each link*/
  }
  addClickListenersToCategories();
}
