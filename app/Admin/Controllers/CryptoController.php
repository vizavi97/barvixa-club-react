<?php

namespace App\Admin\Controllers;

use App\Classes\AdminHelper;
use App\Models\Crypto;
use App\Http\Controllers\Controller;
use Encore\Admin\Controllers\HasResourceActions;
use Encore\Admin\Form;
use Encore\Admin\Grid;
use Encore\Admin\Layout\Content;
use Encore\Admin\Show;

class CryptoController extends Controller
{
    use HasResourceActions;

    /**
     * Index interface.
     *
     * @param Content $content
     * @return Content
     */
    public function index(Content $content)
    {
        return $content
            ->header(trans('admin.index'))
            ->description(trans('admin.description'))
            ->body($this->grid());
    }

    /**
     * Show interface.
     *
     * @param mixed $id
     * @param Content $content
     * @return Content
     */
    public function show($id, Content $content)
    {
        return $content
            ->header(trans('admin.detail'))
            ->description(trans('admin.description'))
            ->body($this->detail($id));
    }

    /**
     * Edit interface.
     *
     * @param mixed $id
     * @param Content $content
     * @return Content
     */
    public function edit($id, Content $content)
    {
        return $content
            ->header(trans('admin.edit'))
            ->description(trans('admin.description'))
            ->body($this->form()->edit($id));
    }

    /**
     * Create interface.
     *
     * @param Content $content
     * @return Content
     */
    public function create(Content $content)
    {
        return $content
            ->header(trans('admin.create'))
            ->description(trans('admin.description'))
            ->body($this->form());
    }

    /**
     * Make a grid builder.
     *
     * @return Grid
     */
    protected function grid()
    {
        $grid = new Grid(new Crypto);

        $grid->id('ID');
        $grid->column('active','Активность')->switch(AdminHelper::switcherData());
        $grid->column('sort','Сортировка')->editable();
        $grid->column('name','Название');
        $grid->column('code','Код');
        $grid->column('numeric','Числовой код');

        return $grid;
    }

    /**
     * Make a show builder.
     *
     * @param mixed $id
     * @return Show
     */
    protected function detail($id)
    {
        $show = new Show(Crypto::findOrFail($id));

        $show->id('ID');
        $show->name('name');
        $show->code('code');
        $show->numeric('numeric');
        $show->created_at(trans('admin.created_at'));
        $show->updated_at(trans('admin.updated_at'));

        return $show;
    }

    /**
     * Make a form builder.
     *
     * @return Form
     */
    protected function form()
    {
        $form = new Form(new Crypto);

        $form->display('ID');
        $form->switch('active', 'Активность')->options(AdminHelper::switcherData());
        $form->number('sort', 'Сортировка');
        $form->text('name', 'Название');
        $form->text('code', 'Код');
        $form->number('numeric', 'Числовой код');
        $form->image('icon', 'Иконка');


//        $grid->column('name','Название');
//        $grid->column('code','Код');
//        $grid->column('numeric','Числовой код');

        return $form;
    }
}
