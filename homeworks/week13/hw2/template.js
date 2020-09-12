export const css = `
.card {
  margin-top: 10px;
}

.hide {
  display: none;
}
`;

export function getForm(formClassName, commentClassName, loadMoreClassName) {
  return `
  <div>
    <form class="${formClassName}">
      <div class="form-group">
        <label>暱稱</label>
        <input name="nickname" type="text" class="form-control">
      </div>
      <div class="form-group">
        <label>請輸入留言</label>
        <textarea name="content" class="form-control" rows="4"></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    <div class="${commentClassName}"></div>
    <button type="button" class="${loadMoreClassName} btn btn-primary mt-4">載入更多</button>
  </div>
`;
}
