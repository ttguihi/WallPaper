const SYSTEM_INFO = uni.getSystemInfoSync(); //获取系统信息

export const getStatusBarHeight = () => SYSTEM_INFO.statusBarHeight || 15;

export const getTitleBarHeight = () => {
	//获取胶囊按钮状态
	if (uni.getMenuButtonBoundingClientRect) {
		let {
			top,
			height
		} = uni.getMenuButtonBoundingClientRect();
		return height + (top - getStatusBarHeight()) * 2
	} else {
		return 40;
	}
}

//状态栏+标题栏高度
export const getNavBarHeight = () => getStatusBarHeight() + getTitleBarHeight();

export const getLeftIconLeft = () => {
	// #ifdef MP-TOUTIAO
	let {
		leftIcon: {
			left,
			width
		}
	} = tt.getCustomButtonBoundingClientRect();
	return left + parseInt(width);
	// #endif

	// #ifndef MP-TOUTIAO
	return 0
	// #endif	
}