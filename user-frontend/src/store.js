import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    data: [
      {
        id: "1",
        location: "main-location",
        status: [{ name: "go-ahead" }, { name: "paid" }],
        event_id: "ft-8d243000-9500-4d33-8d6d-9f158858fc45",
        start_date: "May 2, 2023",
        end_date: "May 9, 2023",
      },
      {
        id: "2",
        location: "main-location",
        status: [{ name: "go-ahead" }, { name: "paid" }],
        event_id: "ft-8d243000-9500-4d33-8d6d-9f158858fc45",
        start_date: "May 5, 2023",
        end_date: "May 14, 2023",
      },
      {
        id: "3",
        location: "main-location",
        status: [{ name: "go-ahead" }],
        event_id: "ft-8d243000-9500-4d33-8d6d-9f158858fc45",
        start_date: "May 10, 2023",
        end_date: "May 22, 2023",
      },
      {
        id: "4",
        location: "main-location",
        status: [{ name: "go-ahead" }, { name: "paid" }],
        event_id: "ft-8d243000-9500-4d33-8d6d-9f158858fc45",
        start_date: "August 5, 2023",
        end_date: "August 9, 2023",
      },
      {
        id: "5",
        location: "main-location",
        status: [{ name: "go-ahead" }],
        event_id: "ft-8d243000-9500-4d33-8d6d-9f158858fc45",
        start_date: "September 20, 2023",
        end_date: "September 29, 2023",
      },
    ],
  },
  mutations: {},
  actions: {},
});
