import { Controller, Get, Post, Body, Patch, Param, Delete , ParseIntPipe, HttpStatus,ValidationPipe, Req} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id' ,new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id:number ,@Req() request: Request) {
    return this.productService.findOne({id});
  }

  @Patch(':id')
  update(@Body(new ValidationPipe()) productData: UpdateProductDto, @Param('id' ,new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id:number) {
    return this.productService.update({where: {id},data:productData});
  }

  @Delete(':id')
  remove(@Param('id',new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id:number) {
    return this.productService.remove({id});
  }
}
