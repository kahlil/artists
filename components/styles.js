export const styles = `
	<style>
		.list {
			width: 30%;
			height: 100vh;
			float: left
		}
		.list li { cursor: pointer; }
		.detail-view {
			width: 70%;
		}
    .heart {
      width: 16px;
      height: 18px;
      position: relative;
      display: inline-block;
    }
    .heart:before {
      content: "♡";
      position: absolute;
      top: 0;
      right: 0;
    }
    .hearted:before {
      content: "💖";
    }
	</style>
`;
