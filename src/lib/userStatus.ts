interface StatusConfig {
  label: string;
  className: string;
}

export function getUserStatus(isBlocked: boolean, isActive: boolean): StatusConfig {
  if (isBlocked) {
    return {
      label: '已封禁',
      className: 'bg-red-100 text-red-800'
    };
  }
  
  if (!isActive) {
    return {
      label: '未激活',
      className: 'bg-yellow-100 text-yellow-800'
    };
  }
  
  return {
    label: '正常',
    className: 'bg-green-100 text-green-800'
  };
} 