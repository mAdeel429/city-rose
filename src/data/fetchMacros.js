import instance from './axiosInstance';

export const fetchAllMacros = async () => {
  const allData = [];
  let page = 1;
  const limit = 25;
  let totalPages = 1;

  try {
    while (page <= totalPages) {
      const response = await instance.post('/macro/list', {
        search_text: '',
        page,
        limit,
      });

      const { data, total_results, items_per_page } = response.data;

      if (data?.length) {
        allData.push(...data);
      }

      totalPages = Math.ceil(total_results / items_per_page);
      page++;
    }

    // console.log(`✅ Fetched ${allData.length} macros in total`);
    // console.table(allData);
    return allData;
  } catch (error) {
    console.error('❌ Error fetching all macros:', error);
    return [];
  }
};
