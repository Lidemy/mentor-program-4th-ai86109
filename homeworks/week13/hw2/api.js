/* eslint-disable import/no-unresolved */
import $ from 'jquery';

export function getComments(apiUrl, sitekey, cb) {
  $.ajax({
    url: `${apiUrl}/api_comments.php?site_key=${sitekey}&id=0`,
  }).done((data) => {
    cb(data);
  });
}

export function addComments(apiUrl, newCommentData, cb) {
  $.ajax({
    type: 'POST',
    url: `${apiUrl}/api_add_comments.php`,
    data: newCommentData,
  }).done((data) => {
    cb(data);
  });
}

export function hideLoadMore(apiUrl, sitekey, id, cb) {
  $.ajax({
    url: `${apiUrl}/api_loadmore.php?site_key=${sitekey}&id=${id}`,
  }).done((data) => {
    cb(data);
  });
}
