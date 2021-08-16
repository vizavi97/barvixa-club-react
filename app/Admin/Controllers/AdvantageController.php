<?php

namespace App\Admin\Controllers;

use App\Classes\AdminHelper;
use App\Models\Advantage;
use App\Http\Controllers\Controller;
use Encore\Admin\Controllers\HasResourceActions;
use Encore\Admin\Form;
use Encore\Admin\Grid;
use Encore\Admin\Layout\Content;
use Encore\Admin\Show;
use Illuminate\Support\Str;

class AdvantageController extends Controller
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
        $grid = new Grid(new Advantage);

        $grid->column('id','ID');
        $grid->column('active','Активность')->switch(AdminHelper::switcherData());
        $grid->column('sort','Сортировка')->editable();
        $grid->column('title_ru','Заголовок RU')->editable();
        $grid->column('title_en','Заголовок EN')->editable();
        $grid->column('intro_ru','Текст RU')->editable();
        $grid->column('intro_en','Текст EN')->editable();

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
        $show = new Show(Advantage::findOrFail($id));

        $show->id('ID');
        $show->slug('slug');
        $show->title_ru('title_ru');
//        $show->title_en('title_en');
//        $show->intro_ru('intro_ru');
//        $show->intro_en('intro_en');
//        $show->text_ru('text_ru');
//        $show->text_en('text_en');
        $show->icon('icon');
//        $show->created_at(trans('admin.created_at'));
//        $show->updated_at(trans('admin.updated_at'));

        return $show;
    }

    /**
     * Make a form builder.
     *
     * @return Form
     */
    protected function form()
    {
        $form = new Form(new Advantage);
        $form->tab('Общие', function (Form $form) {
            $form->display('id');
            $form->switch('active','Активность')->options(AdminHelper::switcherData());
            $form->number('sort','Сортировка');
            $form->image('icon','Иконка' )->uniqueName();
        });
        $form->tab('RU', function (Form $form) {
            $form->text('title_ru','Заголовок ru' );
            $form->text('intro_ru','Интротект ru' );
            $form->textarea('text_ru','Текст ru' );
        });
        $form->tab('EN', function (Form $form) {
            $form->text('title_en','Заголовок en' );
            $form->text('intro_en','Интротект en' );
            $form->textarea('text_en','Текст en' );

        });

/*        $form->saving(function (Form $form){
            if($form->title_en){
                $form->slug = Str::slug($form->title_en);
            }
        });*/


        return $form;
    }
}
