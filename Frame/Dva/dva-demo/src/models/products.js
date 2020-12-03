export default {
  namespace: 'products',
  state: [
    {key: 1, id: 1, name: 'dva'},
    {key: 2, id: 2, name: 'antd'},
  ],
  reducers: {
    'delete'(state, {payload: id}) {
      return state.filter(item => item.id !== id);
    },
  },
};
