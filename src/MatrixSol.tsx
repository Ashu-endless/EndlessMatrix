const math = require("mathjs")

export type matrix = number[][]

export const MatrixSol =(matrix:matrix)=>{

    let isSquareMatrix  =  matrix.length === matrix[0].length

    return{
        determinant  : ()=>{

            if(!( matrix.length === matrix[0].length)){
                return "can't calculate determinant of non-square matrix"
            }

            // console.log(isSquareMatrix)
            // console.log(matrix)
            // console.log(matrix.length,matrix[0].length)
            return math.det(matrix)
            // switch (matrix.length) {
            //     case 1:
            //         return matrix[0][0]
            //     case 2:
            //         return matrix[0][0]*matrix[1][1]-matrix[0][1]*matrix[1][0]
            //     case 3 :
            //         return matrix[0][0]*matrix[1][1]-matrix[0][1]*matrix[1][0]

            //     default:
            //         return "errror"
            // }


        },
        transpose : ()=>{
            return matrix[0].map((col, c) => matrix.map((row, r) => matrix[r][c]));

        },
        inverse : ()=>{


            if(!isSquareMatrix){
                return "non square matrix do not have inverse !"
            }else if( isSquareMatrix && math.det(matrix) === 0 ){
                return "matrix is non-singular (determinant = 0 ) , it does not have inverse"
            }else{
                return  math.inv(matrix)

            }

        },
        rank : ()=>{
            const mat = JSON.parse(JSON.stringify(matrix))
            function swap(mat: matrix, row1: number , row2: number , col: number)
            {
                for (i = 0; i < col; i++)
                {
                    var temp = mat[row1][i];
                    mat[row1][i] = mat[row2][i];
                    mat[row2][i] = temp;
                }
            }

            let R  = matrix.length;
            var rank = matrix.length;
	
            for (let row = 0; row < rank; row++)
            {
                
                // Before we visit current row
                // 'row', we make sure that
                // mat[row][0],....mat[row][row-1]
                // are 0.
        
                // Diagonal element is not zero
                if (mat[row][row] !== 0)
                {
                    for (let col = 0; col < R; col++)
                    {
                        if (col !== row)
                        {
                            // This makes all entries
                            // of current column
                            // as 0 except entry
                            // 'mat[row][row]'
                            var mult =
                            mat[col][row] /
                                        mat[row][row];
                                        
                            for (let i = 0; i < rank; i++)
                            
                                mat[col][i] -= mult
                                        * mat[row][i];
                        }
                    }
                }
        
                // Diagonal element is already zero.
                // Two cases arise:
                // 1) If there is a row below it
                // with non-zero entry, then swap
                // this row with that row and process
                // that row
                // 2) If all elements in current
                // column below mat[r][row] are 0,
                // then remove this column by
                // swapping it with last column and
                // reducing number of columns by 1.
                else
                {
                    let reduce = true;
        
                    // Find the non-zero element
                    // in current column
                    for (var i = row + 1; i < R; i++)
                    {
                        // Swap the row with non-zero
                        // element with this row.
                        if (mat[i][row] !== 0)
                        {
                            swap(mat, row, i, rank);
                            reduce = false;
                            break ;
                        }
                    }
        
                    // If we did not find any row with
                    // non-zero element in current
                    // column, then all values in
                    // this column are 0.
                    if (reduce)
                    {
                        // Reduce number of columns
                        rank--;
        
                        // Copy the last column here
                        for (i = 0; i < R; i ++)
                            mat[i][row] = mat[i][rank];
                    }
        
                    // Process this row again
                    row--;
                }
        
            // Uncomment these lines to see
            // intermediate results display(mat, R, C);
            // printf(<br>);
            }
            
            return rank;
        },

        isSquareMatrix,

        columnsCount : matrix[0].length,
        rowCount : matrix.length,

        multiplyBy:(matrix_:matrix | number)=>{

            if(typeof(matrix_) !== "number" && matrix[0].length !== matrix_.length){
                
                return "The number of columns of the first matrix in the multiplication process must equal the number of rows of the second matrix"
            }

            return math.multiply(matrix,matrix_)
        },
        add:(matrix_:matrix)=>{

            let p = [[6,-2,2],[-2,3,-1],[2,-1,3]]
            console.log(math.eigs(p))
            // console.log(math.numeric("6/7","Fraction"))
            if(matrix[0].length !== matrix_[0].length || matrix.length !== matrix_.length  ){
                return "for addition of two matrices , their order should be same i.e the number of rows and columns should be same for  the matrices"
            }

            return math.add(matrix,matrix_)
        },
        subtract:(matrix_:matrix)=>{
            if(matrix[0].length !== matrix_[0].length || matrix.length !== matrix_.length  ){
                return "for difference of two matrices , their order should be same i.e the number of rows and columns should be same for the matrices"
            }

            return math.subtract(matrix,matrix_)
        },
        multiplybyScalar:(number:number)=>{
            return math.multiply(matrix,number)
        },
        power:(number:number)=>{
            return math.dotPow(matrix,number)
        },
        eigenValue : ()=>{

            if(!( matrix.length === matrix[0].length)){
                return "eigen value exists only for square matrix"
            }

            console.log(matrix)

            try {

                return math.eigs(matrix)
            }
            catch(err){
                return "error"
            }

        }
        

    }
}



export function fracStr(val:number){

    if(val % 1 !== 0 && typeof(val) === "number"){

    return `${math.numeric(val,"Fraction").n}/${math.numeric(val,"Fraction").d}`

    }

    return val
}