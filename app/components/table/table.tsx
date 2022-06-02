import * as React from "react"
import { StyleProp, View, ScrollView,  ViewStyle, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { DataTable } from 'react-native-paper';
import { Post } from "../../models";

const numberOfItemsPerPageList = [5, 10, 20];

const CONTAINER: ViewStyle = {
  backgroundColor:"white"
}

export interface TableProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  tableData: Post[];
  tableHead: string[];
  onDetails: (item: Post)=> void
}

/**
 * Describe your component here
 */
const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, paddingBottom:100},
  head: { backgroundColor: '#f1f8ff'  },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: {  backgroundColor:"white" },
  text: {
    paddingHorizontal:5,
    paddingVertical:10, 
    textAlign: 'center',
  }
});


export const Table = observer(function Table(props: TableProps) {
  const { style,tableData, tableHead, onDetails} = props
  const viewStyle = Object.assign({}, CONTAINER, style)
  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(numberOfItemsPerPageList[0]);
  const from = page * numberOfItemsPerPage;
  const to = Math.min((page + 1) * numberOfItemsPerPage, tableData.length);
  React.useEffect(() => {
     setPage(0);
  }, [numberOfItemsPerPage]);
  const header = React.useMemo(() => 
    tableHead.map((head:string)=> <DataTable.Title key={head}>{head}</DataTable.Title>),
  [tableHead])
  const rows = React.useMemo(()=> 
    tableData.slice(from, to).map((rowData: Post, index: number)=>
      <DataTable.Row key={index} onPress={onDetails.bind({}, rowData)}>
        {Object.values(rowData).map((data: string, index: number)=> <DataTable.Cell key={index}>{data}</DataTable.Cell>)}
      </DataTable.Row>
    ),
  [!tableData.length, from, to])
  return (
    <View style={styles.container}>
      <DataTable style={viewStyle}>
        <DataTable.Header>
          {header}
        </DataTable.Header>
        <ScrollView>
          {rows}
        </ScrollView>
        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(tableData.length / numberOfItemsPerPage)}
          onPageChange={page => setPage(page)}
          label={`${from + 1}-${to} of ${tableData.length}`}
          showFastPaginationControls
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={numberOfItemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          selectPageDropdownLabel={'Rows per page'}
        />
      </DataTable>
    </View>
  )
})

