/* eslint-disable */
import $ from 'jquery';
import { getComments, addComments, hideLoadMore } from './api';
import { appendCommentToDOM, appendStyle } from './utils';
import { css, getForm } from './template';

export function init(options) {
  let id = 0;
  let sitekey = '';
  let apiUrl = '';
  let containerElement;
  const formClassName = '';
  const formSelector = '';
  const commentClassName = '';
  const commentSelector = '';
  const loadMoreClassName = '';
  const loadMoreSelector = '';

  sitekey = options.sitekey;
  apiUrl = options.apiUrl;
  formClassName = `${sitekey}-add-comment-form`;
  formSelector = '.' + formClassName;
  commentClassName = `${sitekey}-comments`;
  commentSelector = '.' + commentClassName;
  loadMoreClassName = `${sitekey}-load-more`;
  loadMoreSelector = '.' + loadMoreClassName;
  containerElement = $(options.containerSelector);
  containerElement.append(getForm(formClassName, commentClassName, loadMoreClassName));
  appendStyle(css);

  const commentDOM = $(commentSelector);
  hideLoadMore(apiUrl, sitekey, id, (data) => {
    if (!data.ok) {
      alert(data.message);
      return;
    }
    if (data.hide) {
      $(loadMoreSelector).addClass('hide');
    } else {
      $(loadMoreSelector).removeClass('hide');
    }
  });

  getComments(apiUrl, sitekey, (data) => {
    if (!data.ok) {
      alert(data.message);
      return;
    }
    const comments = data.discussion;
    for(const comment of comments) {
      appendCommentToDOM(commentDOM, comment, false);
      id = comment.id;
    }
  });

  $(formSelector).submit((e) => {
    e.preventDefault();
    const nicknameDOM = $(`${formSelector} input[name=nickname]`);
    const contentDOM = $(`${formSelector} textarea[name=content]`);
    const newCommentData = {
      site_key: sitekey,
      nickname: nicknameDOM.val(),
      content: contentDOM.val(),
    }
    addComments(apiUrl, newCommentData, (data) => {
      if (!data.ok) {
        alert(data.message);
        return;
      }
      appendCommentToDOM(commentDOM, newCommentData, true);
      nicknameDOM.val('');
      contentDOM.val('');
    })
  });

  $(loadMoreSelector).click(() => {
    $.ajax({
      url: `${apiUrl}/api_comments.php?site_key=${sitekey}&id=${id}`,
    }).done((data) => {
      if (!data.ok) {
        alert(data.message);
        return;
      }
      const comments = data.discussion;
      for (const comment of comments) {
        appendCommentToDOM(commentDOM, comment, false);
        id = comment.id;
      }
      hideLoadMore(apiUrl, sitekey, id, (data) => {
        if (!data.ok) {
          alert(data.message);
          return;
        }
        if (data.hide) {
          $(loadMoreSelector).addClass('hide');
        } else {
          $(loadMoreSelector).removeClass('hide');
        }
      });
    });
  });
}
