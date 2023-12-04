'use strict';
{
  /*VARIABLES*/
  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';

  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');
    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }
    /* [DONE] add class 'active' to the clicked link */
    clickedElement.classList.add('active');
    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts .active');
    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }
    /*[DONE] get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    /*[DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    /*[DONE] add class 'active' to the correct article */
    targetArticle.classList.add('active');
  };


  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

  const generateTitleLinks = function(){
    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector);
    for(let article of articles){
      /* get the article id */
      const articleId = article.getAttribute('id');
      /* find the title element */
      const titleElement = article.querySelector(optTitleSelector);
      /* get the title from the title element */
      const title = titleElement.innerHTML;
      /* create HTML of the link */
      const link = '<li><a href="#' + articleId + '"><span>' + title + '</span></a></li>';
      console.log('title', title);
      /* insert link into titleList */
      titleList.innerHTML = titleList.innerHTML + link;
      //titleList.insertAdjacentHTML('beforeend', link); - //!! podmień tą funkcję
      console.log('titleList', titleList);
    }
  };
  generateTitleLinks();

}
