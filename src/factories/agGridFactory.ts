import Translation from '@/config/translation/agGridTables'
import { GridApi } from 'ag-grid-community'
import store from '@/store'

export default class AgGridFactory {
  public static getDefaultGridOptions() {
    return {
      defaultColDef: {
        editable: false,
        sortable: true,
        filter: true,
        resizable: true,
      },
      localeText: Translation.localeTableText,
      suppressDragLeaveHidesColumns: true,
      onGridSizeChanged: ({ api }: { api: GridApi }) => {
        if (!store.state['mobileWidth']['isMobile']) {
          api.sizeColumnsToFit()
        }
      },
    }
  }
  public static getActionColumn(params: any) {
    const width = Object.keys(params?.cellRendererParams ?? {}).length * 60 + 20
    return {
      headerName: 'Действия',
      pinned: store.state['mobileWidth']['isMobile'] ? 'unset' : 'right',
      colId: 'actions',
      maxWidth: width,
      width: width,
      filter: false,
      sortable: false,
      cellRendererFramework: 'ActionRenderer',
      ...params,
    }
  }
  public static getDefaultRowHeight() {
    return 45
  }
  public static getBigRowHeight(scale = 3) {
    return scale * AgGridFactory.getDefaultRowHeight()
  }
}
